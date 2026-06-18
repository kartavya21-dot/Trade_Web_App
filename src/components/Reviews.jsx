import React from 'react';
import { motion } from 'framer-motion';
import { reviewsContent } from '../content/reviews.js';

const REVIEWS = reviewsContent.reviews;

export default function Reviews() {
  return (
    <section id='reviews' style={{backgroundColor: "rgba(2, 6, 23, 0.5)"}} className="relative py-24 overflow-hidden">
      {/* Background decoration to match your other sections */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacinp: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white text-4xl md:text-5xl font-black mb-4"
          >
            {reviewsContent.headingPrefix}<span className="text-indigo-500">{reviewsContent.headingHighlight}</span>
          </motion.h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            {reviewsContent.subheading}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`
                relative p-8 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm
                hover:border-indigo-500/50 transition-colors group overflow-hidden
                ${review.size === 'large' ? 'md:col-span-2' : 'md:col-span-1'}
              `}
            >
              {/* Moving "Scanning" Light Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />

              <div className="flex flex-col h-full">
                {/* Star Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, star) => (
                    <span key={star} className="text-indigo-500 text-sm">★</span>
                  ))}
                </div>

                <p className="text-slate-300 text-lg leading-relaxed mb-8 flex-grow italic">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{review.name}</h4>
                    <p className="text-slate-500 text-sm">{review.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}