import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contactFormContent } from "../content/contactForm.js";

// This component reuses the logic and UI from your original ContactForm,
// but wraps it in a modal structure.

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tradingExperience: "",
    interests: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState("");

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const tradingExperienceOptions = [
    "Beginner (0-1 Year)",
    "Intermediate (1-3 Years)",
    "Advanced (3-5 Years)",
    "Professional (5+ Years)",
  ];

  const interestOptions = ["MCX", "Options", "Futures", "Swing Trading"];

  const handleInterestToggle = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("tradingExperience", formData.tradingExperience);
      form.append("interests", formData.interests.join(", "));

      await fetch(contactFormContent.formActionUrl, {
        method: "POST",
        mode: "no-cors",
        body: form,
      });

      setSubmitStatus("success");
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
      setErrorMessage(
        "Something went wrong. Please check your internet connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value,
    }));
  };

  const handleResetForm = () => {
    setSubmitStatus(null);
    setErrorMessage("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      tradingExperience: "",
      interests: [],
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl max-h-[90vh] bg-slate-950 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-800"
          >
            <div className="p-6 sm:p-8 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div className="text-left">
                  <h2 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
                    {contactFormContent.heading}
                  </h2>
                  <p className="text-slate-400 text-sm sm:text-base mt-2">
                    {contactFormContent.subheading}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-2 h-2 rounded-full bg-transparent text-slate-700 flex items-center justify-center hover:text-slate-600 transition-colors shrink-0 ml-4"
                >
                  ✕
                </button>
              </div>

              <AnimatePresence mode="wait">
                {submitStatus === "success" ? (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-6 p-6 sm:p-8 text-center flex flex-col items-center justify-center min-h-[400px]"
                  >
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-white text-2xl font-bold">
                      Submission Successful!
                    </h3>
                    <p className="text-slate-400 text-sm sm:text-base max-w-sm">
                      Thank you for applying. We will contact you shortly.
                    </p>
                    <button
                      onClick={handleResetForm}
                      type="button"
                      className="mt-6 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-all font-medium text-sm"
                    >
                      Submit another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-5"
                    onSubmit={handleSubmit}
                  >
                    {submitStatus === "error" && (
                      <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-sm flex items-start gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        <div>
                          <span className="font-bold block mb-0.5">
                            Submission Failed
                          </span>
                          {errorMessage}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2 ml-1">
                        {contactFormContent.labels?.name}
                      </label>
                      <input
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        placeholder={contactFormContent.placeholders?.name}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2 ml-1">
                        {contactFormContent.labels?.email}
                      </label>
                      <input
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder={contactFormContent.placeholders?.email}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2 ml-1">
                        {contactFormContent.labels?.phone}
                      </label>
                      <input
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="tel"
                        maxLength={10}
                        placeholder={contactFormContent.placeholders?.phone}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2 ml-1">
                        Trading Experience
                      </label>
                      <div className="relative">
                        <select
                          required
                          name="tradingExperience"
                          value={formData.tradingExperience}
                          onChange={handleChange}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-slate-950">
                            Select Experience
                          </option>
                          {tradingExperienceOptions.map((option) => (
                            <option
                              key={option}
                              value={option}
                              className="bg-slate-950"
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-3 ml-1">
                        I'm Most Interested In
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {interestOptions.map((interest) => {
                          const selected =
                            formData.interests.includes(interest);
                          return (
                            <button
                              key={interest}
                              type="button"
                              onClick={() => handleInterestToggle(interest)}
                              className={`px-4 py-2 text-sm rounded-xl border transition-all duration-200 ${
                                selected
                                  ? "bg-indigo-600 border-indigo-500 text-white font-medium"
                                  : "bg-slate-900 border-slate-800 text-slate-300 hover:border-indigo-500/50"
                              }`}
                            >
                              {interest}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={!isLoading ? { scale: 1.01 } : {}}
                      whileTap={!isLoading ? { scale: 0.99 } : {}}
                      className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{contactFormContent.buttons?.sending}</span>
                        </div>
                      ) : (
                        contactFormContent.buttons?.submit
                      )}
                    </motion.button>

                    <p className="text-center text-slate-600 text-xs leading-relaxed px-2 mt-4">
                      {contactFormContent.disclaimer}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
