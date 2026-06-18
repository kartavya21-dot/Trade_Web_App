import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  // 1. State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const form = new FormData();

      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);

      await fetch(
        "https://script.google.com/macros/s/AKfycbwv6qA2D__iUslNk8Q1-GascEzzD482NyGhmH5jIfMZkJjvHsRujUSKdHg2eZJAvBTl0A/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: form,
        },
      );

      alert("Submitted successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. Handler to redirect to email
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // 1. Configuration
  //   const phoneNumber = "919876543210"; // REPLACE with your WhatsApp number (include country code, NO '+' or '-')

  //   // 2. Combine Subject and Body into one string
  //   const message =
  //     `*Trading Onboarding Request*\n` + // Asterisks make text BOLD in WhatsApp
  //     `--------------------------\n` +
  //     `*Name:* ${formData.name}\n` +
  //     `*Email:* ${formData.email}\n` +
  //     `*Contact:* ${formData.phone}\n\n` +
  //     `_Please get in touch with me for onboarding._`;

  //   // 3. Encode the message for a URL
  //   const encodedMessage = encodeURIComponent(message);

  //   // 4. Redirect to WhatsApp
  //   const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  //   // Using window.open allows them to stay on your site while WhatsApp opens in a new tab
  //   window.open(whatsappUrl, "_blank");
  // };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Ready to start trading?
          </h2>
          <p className="text-slate-400">
            Fill out the form below and our team will get you onboarded.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-6 bg-slate-900/40 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl"
          onSubmit={handleSubmit}
        >
          {/* Name Field */}
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2 ml-1">
              Full Name
            </label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Rahul Bhatt"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-700"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2 ml-1">
              Email Address
            </label>
            <input
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="rahulabhatt@example.com"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-700"
            />
          </div>

          {/* Contact Field */}
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2 ml-1">
              Contact Number
            </label>
            <input
              required
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              placeholder="+91 98765 43210"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-700"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </div>
            ) : (
              "Get in Touch"
            )}
          </motion.button>

          <p className="text-center text-slate-600 text-xs mt-4">
            By clicking "Get in Touch" you agree to our Terms of Service.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
