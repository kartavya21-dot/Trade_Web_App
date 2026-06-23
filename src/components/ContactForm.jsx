import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contactFormContent } from "../content/contactForm.js";

export default function ContactForm() {
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
      console.log(form);
      await fetch(contactFormContent.formActionUrl, {
        method: "POST",
        mode: "no-cors",
        body: form,
      });

      alert("Submitted successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        tradingExperience: "",
        interests: [],
      });
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
      setErrorMessage("Something went wrong. Please check your internet connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "phone"
          ? value.replace(/\D/g, "").slice(0, 10) // keep only digits
          : value,
    }));
  };

  const handleResetForm = () => {
    setSubmitStatus(null);
    setErrorMessage("");
  };

  return (
    <section id="contact" className="relative py-12 md:py-24 overflow-hidden w-full bg-slate-950">
      {/* Background Glow - Scaled intelligently to prevent mobile layout overflow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] bg-indigo-600/10 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 tracking-tight leading-tight">
            {contactFormContent.heading || defaultContactFormContent.heading}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            {contactFormContent.subheading || defaultContactFormContent.subheading}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitStatus === "success" ? (
            /* Immersive Custom Success State (Replaces generic alert) */
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 bg-slate-900/40 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2.5rem] border border-slate-800 shadow-2xl text-center flex flex-col items-center justify-center min-h-[400px]"
            >
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="text-white text-2xl font-bold">Submission Successful!</h3>
              <p className="text-slate-400 text-sm sm:text-base max-w-sm leading-relaxed">
                Thank you for applying. One of our specialist trading coordinators will contact you via phone or email shortly.
              </p>

              <button
                onClick={handleResetForm}
                type="button"
                className="mt-6 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl border border-slate-700 transition-all font-medium text-sm sm:text-base"
              >
                Submit another application
              </button>
            </motion.div>
          ) : (
            /* Main Form View */
            <motion.form
              key="contact-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true }}
              className="space-y-5 sm:space-y-6 bg-slate-900/40 backdrop-blur-xl p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2.5rem] border border-slate-800 shadow-2xl"
              onSubmit={handleSubmit}
            >
              {/* Custom Error Banner (Replaces alert) */}
              {submitStatus === "error" && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-xs sm:text-sm flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <span className="font-bold block mb-0.5">Submission Failed</span>
                    {errorMessage}
                  </div>
                </div>
              )}

              {/* Name Field */}
              <div>
                <label className="block text-slate-400 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ml-1">
                  {contactFormContent.labels?.name || defaultContactFormContent.labels.name}
                </label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder={contactFormContent.placeholders?.name || defaultContactFormContent.placeholders.name}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-white text-sm sm:text-base outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-700"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-slate-400 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ml-1">
                  {contactFormContent.labels?.email || defaultContactFormContent.labels.email}
                </label>
                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder={contactFormContent.placeholders?.email || defaultContactFormContent.placeholders.email}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-white text-sm sm:text-base outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-700"
                />
              </div>

              {/* Contact Field */}
              <div>
                <label className="block text-slate-400 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ml-1">
                  {contactFormContent.labels?.phone || defaultContactFormContent.labels.phone}
                </label>
                <input
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  maxLength={10}
                  placeholder={contactFormContent.placeholders?.phone || defaultContactFormContent.placeholders.phone}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-white text-sm sm:text-base outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-700"
                />
              </div>

              {/* Experience Fields */}
              <div>
                <label className="block text-slate-400 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ml-1">
                  Trading Experience
                </label>
                <div className="relative">
                  <select
                    required
                    name="tradingExperience"
                    value={formData.tradingExperience}
                    onChange={handleChange}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-white text-sm sm:text-base outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-950">
                      Select Experience
                    </option>
                    {tradingExperienceOptions.map((option) => (
                      <option key={option} value={option} className="bg-slate-950">
                        {option}
                      </option>
                    ))}
                  </select>
                  {/* Custom Arrow indicator for clean design consistency across browsers */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Interest Field */}
              <div>
                <label className="block text-slate-400 text-xs sm:text-sm font-medium mb-2.5 sm:mb-3 ml-1">
                  I'm Most Interested In
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {interestOptions.map((interest) => {
                    const selected = formData.interests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        className={`px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg sm:rounded-xl border transition-all duration-200 active:scale-95 ${
                          selected
                            ? "bg-indigo-600 border-indigo-500 text-white font-medium"
                            : "bg-slate-950/50 border-slate-800 text-slate-300 hover:border-indigo-500/50"
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.01 } : {}}
                whileTap={!isLoading ? { scale: 0.99 } : {}}
                className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{contactFormContent.buttons?.sending || defaultContactFormContent.buttons.sending}</span>
                  </div>
                ) : (
                  contactFormContent.buttons?.submit || defaultContactFormContent.buttons.submit
                )}
              </motion.button>

              <p className="text-center text-slate-600 text-[10px] sm:text-xs leading-relaxed px-2 mt-4">
                {contactFormContent.disclaimer || defaultContactFormContent.disclaimer}
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
