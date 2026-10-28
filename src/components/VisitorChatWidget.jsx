import React, { useState, useEffect, useRef } from "react";
import supportAgentImage from "../assets/support-agent.png";

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
    @keyframes vcw-typing-bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-4px); }
    }
    @keyframes vcw-callout-pop {
      0%   { opacity: 0; transform: translateY(6px) scale(0.96); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes vcw-text-fade {
      0%   { opacity: 0; transform: translateY(3px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes vcw-online-ping {
      0%   { transform: scale(1); opacity: 0.85; }
      70%  { transform: scale(2.3); opacity: 0; }
      100% { transform: scale(2.3); opacity: 0; }
    }
    @keyframes vcw-badge-pulse {
      0%, 100% { transform: scale(1); }
      50%      { transform: scale(1.15); }
    }
  `;
  document.head.appendChild(style);
}

// ── Support specialist portrait ──
function SupportAgentAvatar({ size = 48, className = "" }) {
  return (
    <img
      src={supportAgentImage}
      alt="TradeAdmin support specialist"
      width={size}
      height={size}
      className={className}
      style={{
        display: "block",
        flexShrink: 0,
        width: size,
        height: size,
        objectFit: "cover",
        objectPosition: "center 28%",
        borderRadius: "50%",
      }}
    />
  );
}

const CALLOUT_MESSAGES = [
  "How can I help you? 👋",
  "I am here to help you! 😊",
];

const WELCOME_MESSAGE = {
  id: "welcome-system-msg",
  message: "Hi there! 👋 How can we help you today? Feel free to ask anything!",
  sender_type: "AGENT",
  sender_name: "TradeAdmin Support",
  created_at: new Date().toISOString(),
  _isWelcome: true,
};

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

  const [messages, setMessages] = useState([]);
  const [pendingMessages, setPendingMessages] = useState([]); // optimistic messages waiting for ack
  const [deliveredIds, setDeliveredIds] = useState(new Set()); // recently delivered pending IDs (for checkmark flash)
  const [inputText, setInputText] = useState("");
  const [agentName, setAgentName] = useState(null);
  const [chatStatus, setChatStatus] = useState("DISCONNECTED"); // DISCONNECTED, CONNECTING, WAITING, ACTIVE, CLOSED
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [awaitingReply, setAwaitingReply] = useState(false); // true when visitor sent a msg and no agent reply yet
  const [calloutIndex, setCalloutIndex] = useState(0);
  const [showCallout, setShowCallout] = useState(false);
  const [calloutDismissed, setCalloutDismissed] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);
  const replyTimerRef = useRef(null); // 30s auto-message timer

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pendingMessages, isOpen, showTypingIndicator]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    };
  }, []);

  // Show callout speech bubble after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCallout(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Alternate callout message every 4 seconds
  useEffect(() => {
    if (!showCallout || calloutDismissed || isOpen) return;
    const interval = setInterval(() => {
      setCalloutIndex((prev) => (prev + 1) % CALLOUT_MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [showCallout, calloutDismissed, isOpen]);

  // ── Start fake typing indicator + 30s auto-message timer ──
  const startReplyTimer = () => {
    // Clear any existing timer
    if (replyTimerRef.current) clearTimeout(replyTimerRef.current);

    setShowTypingIndicator(true);
    setAwaitingReply(true);

    replyTimerRef.current = setTimeout(() => {
      setShowTypingIndicator(false);
      setAwaitingReply(false);
      replyTimerRef.current = null;

      // Inject a local system message (not sent to backend)
      const systemMsg = {
        id: `system-${Date.now()}`,
        message: "Our support team is currently busy. We'll get back to you shortly — thanks for your patience! 🙏",
        sender_type: "SYSTEM",
        sender_name: "TradeAdmin Support",
        created_at: new Date().toISOString(),
        _isSystem: true,
      };
      setMessages((prev) => [...prev, systemMsg]);
    }, 30000);
  };

  // ── Cancel the timer (agent replied) ──
  const cancelReplyTimer = () => {
    if (replyTimerRef.current) {
      clearTimeout(replyTimerRef.current);
      replyTimerRef.current = null;
    }
    setShowTypingIndicator(false);
    setAwaitingReply(false);
  };

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
    setMessages([]);
    setPendingMessages([]);
    setDeliveredIds(new Set());
    setAgentName(null);
    setChatStatus("DISCONNECTED");
    setShowTypingIndicator(false);
    setAwaitingReply(false);
    if (replyTimerRef.current) {
      clearTimeout(replyTimerRef.current);
      replyTimerRef.current = null;
    }
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
        // Conversation was deleted or visitor UUID is invalid — reset session
        resetVisitorSession();
      }
    } catch (err) {
      console.error("Failed to fetch message history:", err);
    }
  };

  // 2. Start or resume chat session directly without upfront forms
  const startChatSession = async () => {
    try {
      setChatStatus("CONNECTING");

      const res = await fetch(`${API_BASE_URL}/chat/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uuid: visitorUuid || undefined,
          name: visitorName.trim() || undefined,
          email: visitorEmail.trim() || undefined,
          phone: visitorPhone.trim() || undefined,
        }),
      });

      if (!res.ok) throw new Error("Failed to start chat session");

      const data = await res.json();
      setConversationId(data.conversation_id);
      setVisitorUuid(data.visitor_uuid);

      // Persist visitor details and session in localStorage
      localStorage.setItem("visitor_conversation_id", data.conversation_id);
      localStorage.setItem("visitor_uuid", data.visitor_uuid);

      await fetchHistory(data.conversation_id, data.visitor_uuid);
      return data.conversation_id;
    } catch (err) {
      console.error("Direct chat session start error:", err);
      setChatStatus("DISCONNECTED");
      return null;
    }
  };

  // 3. Connect WebSocket when conversationId is available
  useEffect(() => {
    if (!conversationId) return;

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

        // If this is an agent message, cancel the reply timer (they responded)
        if (incomingMsg.sender_type === "EMPLOYEE" || incomingMsg.sender_type === "AGENT") {
          cancelReplyTimer();
        }

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
        // Agent or Admin deleted the chat — reset session so visitor can start fresh
        resetVisitorSession();
      }
    };

    ws.onclose = () => {
      setChatStatus("DISCONNECTED");
    };

    return () => {
      if (ws) ws.close();
    };
  }, [conversationId]);

  // Handle open widget (Instant Connect on click)
  const handleToggleWidget = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    setHasInteracted(true);
    if (nextOpen) {
      setShowCallout(false);
      if (conversationId && visitorUuid) {
        fetchHistory(conversationId, visitorUuid);
      } else {
        startChatSession();
      }
    }
  };

  // 4. Send Message over WebSocket — with optimistic pending and auto-connect
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    // Create an optimistic pending message
    const pendingMsg = {
      _pendingId: `pending-${++pendingIdCounter}`,
      message: text,
      sender_type: "VISITOR",
      sender_name: "You",
      created_at: new Date().toISOString(),
      _status: "sending",
    };

    setPendingMessages((prev) => [...prev, pendingMsg]);
    setInputText("");

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ message: text }));
    } else {
      const activeConvId = conversationId || (await startChatSession());
      if (activeConvId && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ message: text }));
      }
    }

    // Start the fake typing indicator + 30s auto-message timer
    startReplyTimer();
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

  // ── Typing indicator bubble (3 bouncing dots) ──
  const TypingIndicator = () => (
    <div
      style={{
        alignSelf: "flex-start",
        maxWidth: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        animation: "vcw-fade-in-up 0.25s ease",
      }}
    >
      <div
        style={{
          padding: "10px 18px",
          borderRadius: "16px 16px 16px 2px",
          backgroundColor: "#27272a",
          border: "1px solid #3f3f46",
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: "#a1a1aa",
              display: "inline-block",
              animation: `vcw-typing-bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
      <div style={{ fontSize: 9, color: "#71717a", marginTop: 4, padding: "0 2px" }}>
        {agentName || "Agent"} is typing...
      </div>
    </div>
  );

  // Merge welcome message (if no history), confirmed messages + pending messages for display
  const allDisplayMessages = [
    ...(messages.length === 0 ? [WELCOME_MESSAGE] : []),
    ...messages.map((m) => ({ ...m, _type: m._isSystem ? "system" : "confirmed" })),
    ...pendingMessages.map((p) => ({
      ...p,
      _type: "pending",
      _isDelivered: deliveredIds.has(p._pendingId),
    })),
  ];

  return (
    <div style={{ position: "fixed", bottom: 16, right: 16, zIndex: 99999, fontFamily: "sans-serif" }}>
      {/* Speech Bubble / Callout */}
      {!isOpen && showCallout && !calloutDismissed && (
        <div
          onClick={handleToggleWidget}
          style={{
            position: "absolute",
            right: 78,
            bottom: 8,
            backgroundColor: "#18181b",
            border: "1px solid #3f3f46",
            borderRadius: 16,
            padding: "10px 14px",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 20px rgba(99, 102, 241, 0.2)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            whiteSpace: "nowrap",
            animation: "vcw-callout-pop 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            zIndex: 99998,
            maxWidth: "calc(100vw - 120px)",
            userSelect: "none",
          }}
        >
          {/* Arrow pointing right towards avatar */}
          <div
            style={{
              position: "absolute",
              right: -6,
              bottom: 22,
              width: 12,
              height: 12,
              backgroundColor: "#18181b",
              borderRight: "1px solid #3f3f46",
              borderTop: "1px solid #3f3f46",
              transform: "rotate(45deg)",
            }}
          />

          {/* Live pulsing green dot */}
          <div style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                animation: "vcw-online-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
              }}
            />
            <span
              style={{
                position: "relative",
                display: "block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            />
          </div>

          {/* Text content with keyframe animation on index change */}
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <span
              style={{
                fontSize: 10,
                color: "#a1a1aa",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Live Support
            </span>
            <span
              key={calloutIndex}
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#ffffff",
                animation: "vcw-text-fade 0.35s ease",
              }}
            >
              {CALLOUT_MESSAGES[calloutIndex]}
            </span>
          </div>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCalloutDismissed(true);
            }}
            style={{
              background: "transparent",
              border: "none",
              color: "#71717a",
              cursor: "pointer",
              padding: "2px 4px",
              marginLeft: 4,
              fontSize: 14,
              lineHeight: 1,
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Dismiss"
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#71717a")}
          >
            ×
          </button>
        </div>
      )}

      {/* Floating Widget Trigger Button */}
      {!isOpen && (
        <div style={{ position: "relative" }}>
          <button
            onClick={handleToggleWidget}
            style={{
              color: "#ffffff",
              border: "none",
              borderRadius: "50%",
              width: 64,
              height: 64,
              padding: 0,
              cursor: "pointer",
              boxShadow: "0 8px 28px rgba(99, 102, 241, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease",
              background: "transparent",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(99, 102, 241, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.15) inset";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(99, 102, 241, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.1) inset";
            }}
            title="Chat with Support"
          >
            <SupportAgentAvatar size={64} />

            {/* Online indicator dot on avatar */}
            <span
              style={{
                position: "absolute",
                bottom: 2,
                right: 2,
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                border: "2.5px solid #18181b",
                boxShadow: "0 0 8px rgba(34, 197, 94, 0.8)",
              }}
            />
          </button>

          {/* Unread notification badge ("1") */}
          {!hasInteracted && (
            <span
              style={{
                position: "absolute",
                top: -2,
                right: -2,
                minWidth: 20,
                height: 20,
                padding: "0 5px",
                borderRadius: 10,
                backgroundColor: "#ef4444",
                color: "#ffffff",
                fontSize: 11,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #18181b",
                boxShadow: "0 2px 8px rgba(239, 68, 68, 0.6)",
                pointerEvents: "none",
                animation: "vcw-badge-pulse 2s infinite ease-in-out",
              }}
            >
              1
            </span>
          )}
        </div>
      )}

      {/* Floating Chat Panel */}
      {isOpen && (
        <div
          style={{
            width: "min(360px, calc(100vw - 32px))",
            height: "min(520px, calc(100dvh - 32px))",
            minHeight: 240,
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
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                }}
              >
                <SupportAgentAvatar size={38} />
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
                    {chatStatus === "ACTIVE"
                      ? `Connected with ${agentName || "Agent"}`
                      : chatStatus === "WAITING"
                      ? "Waiting for an available agent..."
                      : chatStatus === "CLOSED"
                      ? "Conversation closed"
                      : chatStatus === "CONNECTING"
                      ? "Connecting to support..."
                      : "Support Online"}
                  </small>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button
                onClick={() => setShowProfileModal(!showProfileModal)}
                style={{ background: "none", border: "none", color: "#a1a1aa", cursor: "pointer", fontSize: 16 }}
                title="Your contact details (optional)"
              >
                ⚙️
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: "none", border: "none", color: "#a1a1aa", cursor: "pointer", fontSize: 18 }}
                title="Minimize chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Profile Edit Overlay Modal (Optional contact details) */}
          {showProfileModal && (
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 12, fontWeight: "bold", color: "#2dd4bf" }}>
                  Your Contact Details (Optional)
                </div>
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  style={{ background: "none", border: "none", color: "#a1a1aa", cursor: "pointer", fontSize: 14 }}
                  title="Close"
                >
                  ✕
                </button>
              </div>
              <p style={{ margin: 0, fontSize: 11, color: "#a1a1aa", lineHeight: 1.4 }}>
                Leave your info so our support team can follow up with you if you leave the chat.
              </p>
              <input
                type="text"
                placeholder="Your Name (Optional)"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                style={{
                  padding: "8px 10px",
                  backgroundColor: "#18181b",
                  border: "1px solid #3f3f46",
                  color: "#fff",
                  borderRadius: 8,
                  fontSize: 12,
                  outline: "none",
                }}
              />
              <input
                type="email"
                placeholder="Your Email (Optional)"
                value={visitorEmail}
                onChange={(e) => setVisitorEmail(e.target.value)}
                style={{
                  padding: "8px 10px",
                  backgroundColor: "#18181b",
                  border: "1px solid #3f3f46",
                  color: "#fff",
                  borderRadius: 8,
                  fontSize: 12,
                  outline: "none",
                }}
              />
              <input
                type="tel"
                placeholder="Phone Number (Optional)"
                value={visitorPhone}
                onChange={(e) => setVisitorPhone(e.target.value)}
                style={{
                  padding: "8px 10px",
                  backgroundColor: "#18181b",
                  border: "1px solid #3f3f46",
                  color: "#fff",
                  borderRadius: 8,
                  fontSize: 12,
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "7px 12px",
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

          {/* Active Chat Messages Interface */}
          <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
            {allDisplayMessages.map((msg) => {
              const isVisitor = msg.sender_type === "VISITOR";
              const isSystem = msg._type === "system";
              const isPending = msg._type === "pending";
              const isDelivered = msg._isDelivered;

              // System messages get a distinct centered style
              if (isSystem) {
                return (
                  <div
                    key={msg.id}
                    style={{
                      alignSelf: "center",
                      maxWidth: "90%",
                      animation: "vcw-fade-in-up 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        padding: "10px 16px",
                        borderRadius: 12,
                        fontSize: 12,
                        lineHeight: 1.5,
                        color: "#e4e4e7",
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                        textAlign: "center",
                      }}
                    >
                      {msg.message}
                    </div>
                    <div style={{ fontSize: 9, color: "#64748b", marginTop: 4, textAlign: "center" }}>
                      {formatTime(msg.created_at)}
                    </div>
                  </div>
                );
              }

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
                    className={`${isVisitor ? "bg-gradient-to-r from-indigo-600 to-indigo-500" : "bg-[#27272a]"}`}
                  >
                    {msg.message}
                  </div>
                  <div style={{ fontSize: 9, color: "#71717a", marginTop: 4, padding: "0 2px", display: "flex", alignItems: "center", gap: 4 }}>
                    {isPending ? (
                      isDelivered ? <DeliveredCheck /> : <SendingDots />
                    ) : (
                      <>
                        {isVisitor ? "You" : (msg.sender_name || agentName || "TradeAdmin Support")} • {formatTime(msg.created_at)}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            {/* Typing indicator — shown after visitor sends, hidden on agent reply or 30s timeout */}
            {showTypingIndicator && <TypingIndicator />}
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
        </div>
      )}
    </div>
  );
}
