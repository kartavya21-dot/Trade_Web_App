import React, { useState, useEffect, useRef } from "react";

const API_BASE_URL = "https://hopeful-abundance-production-8087.up.railway.app";
const WS_BASE_URL = "wss://hopeful-abundance-production-8087.up.railway.app";

// Inline keyframe styles injected once
const STYLE_ID = "visitor-chat-widget-animations";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes vcw-pulse-dot {
      0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
      40% { opacity: 1; transform: scale(1); }
    }
    @keyframes vcw-fade-in-up {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes vcw-delivered-flash {
      0%   { color: #22c55e; }
      100% { color: #71717a; }
    }
  `;
  document.head.appendChild(style);
}

let pendingIdCounter = 0;

export default function VisitorChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState(
    () => localStorage.getItem("visitor_conversation_id") || null
  );
  const [visitorUuid, setVisitorUuid] = useState(
    () => localStorage.getItem("visitor_uuid") || null
  );
  const [visitorName, setVisitorName] = useState(
    () => localStorage.getItem("visitor_name") || ""
  );
  const [visitorEmail, setVisitorEmail] = useState(
    () => localStorage.getItem("visitor_email") || ""
  );
  const [visitorPhone, setVisitorPhone] = useState(
    () => localStorage.getItem("visitor_phone") || ""
  );
  const [hasSubmittedForm, setHasSubmittedForm] = useState(
    () => !!localStorage.getItem("visitor_conversation_id")
  );

  const [messages, setMessages] = useState([]);
  const [pendingMessages, setPendingMessages] = useState([]); // optimistic messages waiting for ack
  const [deliveredIds, setDeliveredIds] = useState(new Set()); // recently delivered pending IDs (for checkmark flash)
  const [inputText, setInputText] = useState("");
  const [agentName, setAgentName] = useState(null);
  const [chatStatus, setChatStatus] = useState("DISCONNECTED"); // DISCONNECTED, CONNECTING, WAITING, ACTIVE, CLOSED
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pendingMessages, isOpen, hasSubmittedForm]);

  const resetVisitorSession = () => {
    localStorage.removeItem("visitor_conversation_id");
    localStorage.removeItem("visitor_uuid");
    localStorage.removeItem("visitor_name");
    localStorage.removeItem("visitor_email");
    localStorage.removeItem("visitor_phone");
    setConversationId(null);
    setVisitorUuid(null);
    setVisitorName("");
    setVisitorEmail("");
    setVisitorPhone("");
    setHasSubmittedForm(false);
    setMessages([]);
    setPendingMessages([]);
    setDeliveredIds(new Set());
    setAgentName(null);
    setChatStatus("DISCONNECTED");
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  // 1. Fetch message history for existing conversation
  const fetchHistory = async (convId, vUuid) => {
    try {
      const queryParam = vUuid ? `?visitor_uuid=${vUuid}` : "";
      const res = await fetch(`${API_BASE_URL}/conversations/${convId}/messages${queryParam}`);
      if (res.ok) {
        const history = await res.json();
        setMessages(history);
        // Clear any pending messages that now appear in history
        setPendingMessages((prev) =>
          prev.filter((p) => !history.some((m) => m.message === p.message))
        );
      } else if (res.status === 404 || res.status === 401 || res.status === 403) {
        // Conversation was deleted or visitor UUID is invalid — reset session to Pre-Chat Form
        resetVisitorSession();
      }
    } catch (err) {
      console.error("Failed to fetch message history:", err);
    }
  };

  // 2. Start new chat session with visitor details
  const handleStartChatSession = async (e) => {
    if (e) e.preventDefault();
    if (!visitorName.trim() || !visitorEmail.trim()) return;

    try {
      setIsSubmittingForm(true);
      setChatStatus("CONNECTING");

      const res = await fetch(`${API_BASE_URL}/chat/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uuid: visitorUuid || undefined,
          name: visitorName.trim(),
          email: visitorEmail.trim(),
          phone: visitorPhone.trim() || undefined,
        }),
      });

      if (!res.ok) throw new Error("Failed to start chat session");

      const data = await res.json();
      setConversationId(data.conversation_id);
      setVisitorUuid(data.visitor_uuid);
      setHasSubmittedForm(true);

      // Persist visitor details and session in localStorage
      localStorage.setItem("visitor_conversation_id", data.conversation_id);
      localStorage.setItem("visitor_uuid", data.visitor_uuid);
      localStorage.setItem("visitor_name", visitorName.trim());
      localStorage.setItem("visitor_email", visitorEmail.trim());
      if (visitorPhone.trim()) localStorage.setItem("visitor_phone", visitorPhone.trim());

      await fetchHistory(data.conversation_id, data.visitor_uuid);
    } catch (err) {
      console.error("Pre-chat submission error:", err);
      setChatStatus("DISCONNECTED");
    } finally {
      setIsSubmittingForm(false);
    }
  };

  // 3. Connect WebSocket when conversationId is available
  useEffect(() => {
    if (!conversationId || !hasSubmittedForm) return;

    const ws = new WebSocket(`${WS_BASE_URL}/ws/visitor/${conversationId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      setChatStatus((prev) => (prev === "ACTIVE" ? "ACTIVE" : "WAITING"));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "message") {
        const incomingMsg = data.message;

        setMessages((prev) => {
          if (prev.some((m) => m.id === incomingMsg.id)) return prev;
          return [...prev, incomingMsg];
        });

        // If this is our own message echoed back, resolve the matching pending message
        if (incomingMsg.sender_type === "VISITOR") {
          setPendingMessages((prev) => {
            const matchIdx = prev.findIndex((p) => p.message === incomingMsg.message);
            if (matchIdx !== -1) {
              const matched = prev[matchIdx];
              // Trigger a brief "delivered" flash
              setDeliveredIds((ds) => {
                const next = new Set(ds);
                next.add(matched._pendingId);
                return next;
              });
              // Remove the flash after 1.5s
              setTimeout(() => {
                setDeliveredIds((ds) => {
                  const next = new Set(ds);
                  next.delete(matched._pendingId);
                  return next;
                });
              }, 1500);
              return prev.filter((_, i) => i !== matchIdx);
            }
            return prev;
          });
        }
      } else if (data.type === "agent_assigned") {
        setAgentName(data.assigned_employee_name);
        setChatStatus("ACTIVE");
      } else if (data.type === "conversation_deleted") {
        // Agent or Admin deleted the chat — reset session to Pre-Chat Form so visitor can start a new chat
        resetVisitorSession();
      }
    };

    ws.onclose = () => {
      setChatStatus("DISCONNECTED");
    };

    return () => {
      if (ws) ws.close();
    };
  }, [conversationId, hasSubmittedForm]);

  // Handle open widget
  const handleToggleWidget = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    if (nextOpen && conversationId && hasSubmittedForm) {
      fetchHistory(conversationId, visitorUuid);
    }
  };

  // 4. Send Message over WebSocket — now with optimistic pending
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      handleStartChatSession();
      return;
    }

    const text = inputText.trim();

    // Create an optimistic pending message
    const pendingMsg = {
      _pendingId: `pending-${++pendingIdCounter}`,
      message: text,
      sender_type: "VISITOR",
      sender_name: visitorName || "You",
      created_at: new Date().toISOString(),
      _status: "sending",
    };

    setPendingMessages((prev) => [...prev, pendingMsg]);

    wsRef.current.send(
      JSON.stringify({
        message: text,
      })
    );
    setInputText("");
  };

  // 5. Update Profile mid-chat
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!visitorUuid) return;
    try {
      const res = await fetch(`${API_BASE_URL}/visitor/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uuid: visitorUuid,
          name: visitorName,
          email: visitorEmail,
          phone: visitorPhone,
        }),
      });
      if (res.ok) {
        localStorage.setItem("visitor_name", visitorName);
        localStorage.setItem("visitor_email", visitorEmail);
        localStorage.setItem("visitor_phone", visitorPhone);
        setShowProfileModal(false);
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const formatTime = (timeStr) => {
    try {
      return new Date(timeStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  // ── Sending indicator (3 pulsing dots) ──
  const SendingDots = () => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
      <span style={{ fontSize: 11, color: "#a1a1aa" }}>Sending</span>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: "#a1a1aa",
            display: "inline-block",
            animation: `vcw-pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </span>
  );

  // ── Delivered checkmark with flash ──
  const DeliveredCheck = () => (
    <span
      style={{
        fontSize: 11,
        animation: "vcw-delivered-flash 1.5s ease forwards",
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
      }}
    >
      Delivered ✓
    </span>
  );

  // Merge confirmed messages + pending messages for display
  const allDisplayMessages = [
    ...messages.map((m) => ({ ...m, _type: "confirmed" })),
    ...pendingMessages.map((p) => ({
      ...p,
      _type: "pending",
      _isDelivered: deliveredIds.has(p._pendingId),
    })),
  ];

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 99999, fontFamily: "sans-serif" }}>
      {/* Floating Widget Trigger Button */}
      {!isOpen && (
        <button
          onClick={handleToggleWidget}
          style={{
            color: "#ffffff",
            border: "none",
            borderRadius: "50%",
            width: 60,
            height: 60,
            cursor: "pointer",
            fontSize: 26,
            boxShadow: "0 8px 24px rgba(13, 148, 136, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s ease",
          }}
          className="bg-gradient-to-r from-indigo-600 to-indigo-500"
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          title="Open Customer Support Chat"
        >
          💬
        </button>
      )}

      {/* Floating Chat Panel */}
      {isOpen && (
        <div
          style={{
            width: 360,
            height: 520,
            backgroundColor: "#18181b",
            color: "#f4f4f5",
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
            border: "1px solid #27272a",
            overflow: "hidden",
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: "14px 18px",
              backgroundColor: "#27272a",
              borderBottom: "1px solid #3f3f46",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
                className="bg-gradient-to-r from-indigo-600 to-indigo-500"
              >
                🎧
              </div>
              <div>
                <strong style={{ display: "block", fontSize: 14, color: "#ffffff" }}>
                  TradeAdmin Support
                </strong>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor:
                        chatStatus === "ACTIVE"
                          ? "#22c55e"
                          : chatStatus === "WAITING"
                          ? "#eab308"
                          : chatStatus === "CLOSED"
                          ? "#ef4444"
                          : "#9ca3af",
                    }}
                  />
                  <small style={{ color: "#a1a1aa", fontSize: 11 }}>
                    {!hasSubmittedForm
                      ? "Pre-Chat Registration"
                      : chatStatus === "ACTIVE"
                      ? `Connected with ${agentName || "Agent"}`
                      : chatStatus === "WAITING"
                      ? "Waiting for an available agent..."
                      : chatStatus === "CLOSED"
                      ? "Conversation closed"
                      : "Connecting..."}
                  </small>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              {hasSubmittedForm && (
                <button
                  onClick={() => setShowProfileModal(!showProfileModal)}
                  style={{ background: "none", border: "none", color: "#a1a1aa", cursor: "pointer", fontSize: 16 }}
                  title="Edit profile details"
                >
                  ⚙️
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: "none", border: "none", color: "#a1a1aa", cursor: "pointer", fontSize: 18 }}
                title="Minimize chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Profile Edit Overlay Modal (For active sessions) */}
          {showProfileModal && hasSubmittedForm && (
            <form
              onSubmit={handleSaveProfile}
              style={{
                padding: 16,
                backgroundColor: "#27272a",
                borderBottom: "1px solid #3f3f46",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: "bold", color: "#2dd4bf" }}>Update Info</div>
              <input
                type="text"
                placeholder="Your Name"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                style={{
                  padding: "8px 10px",
                  backgroundColor: "#18181b",
                  border: "1px solid #3f3f46",
                  color: "#fff",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={visitorEmail}
                onChange={(e) => setVisitorEmail(e.target.value)}
                style={{
                  padding: "8px 10px",
                  backgroundColor: "#18181b",
                  border: "1px solid #3f3f46",
                  color: "#fff",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#0d9488",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 12,
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Save Details
              </button>
            </form>
          )}

          {/* Screen A: Pre-Chat Registration Form (If details not provided yet) */}
          {!hasSubmittedForm ? (
            <form
              onSubmit={handleStartChatSession}
              style={{
                flex: 1,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 16,
                backgroundColor: "#18181b",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 8 }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: 16, color: "#ffffff" }}>👋 Welcome to Support</h3>
                <p style={{ margin: 0, fontSize: 12, color: "#a1a1aa", lineHeight: 1.4 }}>
                  Please fill in your details below so our support team can assist you right away.
                </p>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: "bold", color: "#a1a1aa", marginBottom: 6 }}>
                  FULL NAME <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "10px 14px",
                    backgroundColor: "#27272a",
                    border: "1px solid #3f3f46",
                    color: "#ffffff",
                    borderRadius: 10,
                    fontSize: 13,
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: "bold", color: "#a1a1aa", marginBottom: 6 }}>
                  EMAIL ADDRESS <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. jane@example.com"
                  value={visitorEmail}
                  onChange={(e) => setVisitorEmail(e.target.value)}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "10px 14px",
                    backgroundColor: "#27272a",
                    border: "1px solid #3f3f46",
                    color: "#ffffff",
                    borderRadius: 10,
                    fontSize: 13,
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: "bold", color: "#a1a1aa", marginBottom: 6 }}>
                  PHONE NUMBER <span style={{ color: "#71717a", fontWeight: "normal" }}>(Optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +1 555-0199"
                  value={visitorPhone}
                  onChange={(e) => setVisitorPhone(e.target.value)}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "10px 14px",
                    backgroundColor: "#27272a",
                    border: "1px solid #3f3f46",
                    color: "#ffffff",
                    borderRadius: 10,
                    fontSize: 13,
                    outline: "none",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingForm || !visitorName.trim() || !visitorEmail.trim()}
                style={{
                  marginTop: 8,
                  padding: "12px 16px",
                  backgroundColor: !visitorName.trim() || !visitorEmail.trim() ? "#3f3f46" : "#0d9488",
                  color: !visitorName.trim() || !visitorEmail.trim() ? "#71717a" : "#ffffff",
                  border: "none",
                  borderRadius: 10,
                  cursor: !visitorName.trim() || !visitorEmail.trim() ? "not-allowed" : "pointer",
                  fontWeight: "bold",
                  fontSize: 14,
                  transition: "background-color 0.2s ease",
                }}
              >
                {isSubmittingForm ? "Connecting..." : "Start Chatting →"}
              </button>
            </form>
          ) : (
            /* Screen B: Active Chat Messages Interface */
            <>
              <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
                {allDisplayMessages.length === 0 ? (
                  <div style={{ textAlign: "center", color: "#71717a", fontSize: 12, marginTop: 40 }}>
                    👋 Welcome <strong>{visitorName || "there"}</strong>! Type a message below to chat with our support team.
                  </div>
                ) : (
                  allDisplayMessages.map((msg) => {
                    const isVisitor = msg.sender_type === "VISITOR";
                    const isPending = msg._type === "pending";
                    const isDelivered = msg._isDelivered;

                    return (
                      <div
                        key={msg.id || msg._pendingId}
                        style={{
                          alignSelf: isVisitor ? "flex-end" : "flex-start",
                          maxWidth: "80%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: isVisitor ? "flex-end" : "flex-start",
                          animation: isPending ? "vcw-fade-in-up 0.25s ease" : undefined,
                        }}
                      >
                        <div
                          style={{
                            padding: "10px 14px",
                            borderRadius: isVisitor ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
                            fontSize: 13,
                            lineHeight: 1.4,
                            border: isVisitor ? "none" : "1px solid #3f3f46",
                            wordBreak: "break-word",
                            opacity: isPending && !isDelivered ? 0.7 : 1,
                            transition: "opacity 0.3s ease",
                          }}
                          className={`${isVisitor ? "bg-gradient-to-r from-indigo-600 to-indigo-500" : "bg-[#27272a"}`}
                        >
                          {msg.message}
                        </div>
                        <div style={{ fontSize: 9, color: "#71717a", marginTop: 4, padding: "0 2px", display: "flex", alignItems: "center", gap: 4 }}>
                          {isPending ? (
                            isDelivered ? <DeliveredCheck /> : <SendingDots />
                          ) : (
                            <>
                              {msg.sender_name || (isVisitor ? "You" : "Agent")} • {formatTime(msg.created_at)}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Footer */}
              <form
                onSubmit={handleSendMessage}
                style={{
                  padding: 12,
                  backgroundColor: "#27272a",
                  borderTop: "1px solid #3f3f46",
                  display: "flex",
                  gap: 8,
                }}
              >
                <input
                  type="text"
                  placeholder={
                    chatStatus === "CLOSED"
                      ? "This conversation is closed."
                      : "Type your message..."
                  }
                  value={inputText}
                  disabled={chatStatus === "CLOSED"}
                  onChange={(e) => setInputText(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "10px 14px",
                    backgroundColor: "#18181b",
                    border: "1px solid #3f3f46",
                    color: "#ffffff",
                    borderRadius: 10,
                    fontSize: 13,
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  disabled={chatStatus === "CLOSED" || !inputText.trim()}
                  style={{
                    padding: "10px 16px",
                    backgroundColor: chatStatus === "CLOSED" || !inputText.trim() ? "#3f3f46" : "#0d9488",
                    color: chatStatus === "CLOSED" || !inputText.trim() ? "#71717a" : "#ffffff",
                    border: "none",
                    borderRadius: 10,
                    cursor: chatStatus === "CLOSED" || !inputText.trim() ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                    fontSize: 13,
                    transition: "background-color 0.2s ease",
                  }}
                >
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
