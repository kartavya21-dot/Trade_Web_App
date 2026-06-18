import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { legalModalContent } from '../content/legalModal.js';

export default function LegalModal({ isOpen, onClose, type }) {
  // Prevent scroll when modal is open
  React.useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  const activeContent = legalModalContent[type] || legalModalContent.terms;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl max-h-[80vh] bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <div>
                <h2 className="text-white text-2xl font-bold">{activeContent.title}</h2>
                <p className="text-slate-500 text-sm mt-1">Last Updated: {activeContent.lastUpdated}</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="space-y-6 text-slate-400 leading-relaxed text-sm">
                <p className="text-white font-medium">Please read these carefully.</p>
                <p>{activeContent.text}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-slate-800 bg-slate-900/50 flex justify-end">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}