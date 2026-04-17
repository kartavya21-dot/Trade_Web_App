import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  // 1. State to manage form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 2. Handler to redirect to email
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const ownerEmail = "owner@example.com"; // Replace with your email
    const subject = encodeURIComponent(`Trading Onboarding Request - ${formData.fullName}`);
    
    // Constructing the body text
    const body = encodeURIComponent(
      `Hello,\n\nI am interested in starting my trading journey. Here are my details:\n\n` +
      `Full Name: ${formData.fullName}\n` +
      `Email Address: ${formData.email}\n` +
      `Contact Number: ${formData.contactNumber}\n\n` +
      `Please get in touch with me for onboarding.`
    );

    // Redirecting the user
    window.location.href = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id='contact' className="relative py-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Ready to start trading?</h2>
          <p className="text-slate-400">Fill out the form below and our team will get you onboarded.</p>
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
            <label className="block text-slate-400 text-sm font-medium mb-2 ml-1">Full Name</label>
            <input 
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              type="text" 
              placeholder="Rahul Bhatt"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-700"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2 ml-1">Email Address</label>
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
            <label className="block text-slate-400 text-sm font-medium mb-2 ml-1">Contact Number</label>
            <input 
              required
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              type="tel" 
              placeholder="+91 98765 43210"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-700"
            />
          </div>

          {/* Submit Button */}
          <motion.button 
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all mt-4"
          >
            Get in Touch
          </motion.button>
          
          <p className="text-center text-slate-600 text-xs mt-4">
            By clicking "Get in Touch" you agree to our Terms of Service.
          </p>
        </motion.form>
      </div>
    </section>
  );
}