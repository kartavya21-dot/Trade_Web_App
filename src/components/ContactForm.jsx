import React from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  return (
    <section id='contact' className="relative py-24 bg-[#020617] overflow-hidden">
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
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Name Field */}
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2 ml-1">Full Name</label>
            <input 
              type="text" 
              placeholder="Rahul Bhatt"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-700"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="rahulabhatt@example.com"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-700"
            />
          </div>

          {/* Contact Field */}
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2 ml-1">Contact Number</label>
            <input 
              type="tel" 
              placeholder="+91 98765 43210"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-700"
            />
          </div>

          {/* Submit Button */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all mt-4"
          >
            Get in Touch
          </motion.button>
          
          <p className="text-center text-slate-600 text-xs mt-4">
            By clicking "Get Early Access" you agree to our Terms of Service.
          </p>
        </motion.form>
      </div>
    </section>
  );
}