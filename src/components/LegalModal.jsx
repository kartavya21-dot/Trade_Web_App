import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LegalModal({ isOpen, onClose, type }) {
  // Prevent scroll when modal is open
  React.useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  const content = {
    terms: {
      title: "Terms & Conditions",
      lastUpdated: "April 2026",
      text: "By accessing or using the Super Stock website or services, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, you must discontinue use of our website immediately. All information, content, materials and services available on this website are provided for general information and educational purposes only. Super Stock does not guarantee the accuracy, completeness or suitability of any information or tools provided on this site. You understand and agree that any decision you make based on the information, materials or services provided on this website is made entirely at your own risk and responsibility. Use of this website is at your own discretion. We reserve the right to change, modify, update or remove any part of this website, including content, products, features or services, at any time without prior notice. We also reserve the right to modify, update or revise these Terms & Conditions at any time. It is your responsibility to review these terms regularly to remain informed of any updates. Continued use of the website after such changes will constitute your acceptance of those changes. All logos, text, designs, graphics, icons, trademarks and other content available on the Super Stock website are the property of Super Stock or its licensors. You are not permitted to copy, reproduce, publish, distribute, modify, transmit, sell or exploit any part of this website or its content without our prior written permission. Unauthorized use may violate intellectual property laws and may result in legal action. By using this website, you acknowledge and agree that Super Stock will not be responsible for any losses, damages, expenses, or costs, whether direct or indirect, that arise from your access to or use of this website, or your reliance on any information contained on this website. You agree to indemnify, defend and hold Super Stock harmless from any claims, damages, liabilities, and expenses arising out of or related to your use of this website. Trading Indian exchange or any other financial instrument carries a high level of risk and may not be suitable for all individuals. Results from any trading or financial activity shown or implied on this website are for illustration and educational purposes only and do not guarantee future performance or success. Past performance is not an indicator of future results. If any part of these Terms & Conditions is found to be invalid or unenforceable, that portion shall be considered severable and shall not affect the validity or enforceability of the remaining provisions. These Terms & Conditions shall be governed and interpreted according to applicable laws and jurisdiction as determined by Super Stock. By continuing to use this website, you confirm that you have read, understood, and agreed to the terms stated above. I consent to receive SMS and RCS messages (updates, offers, and security OTPs)."
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "March 2026",
      text: "Welcome to Super Stock. This page explains how we protect your privacy when you use our website. We do not collect personal information during your visit without your knowledge. However, in certain cases, we may ask you to provide personal information online. The information we collect corresponds directly to the service or request you make. We do not share, sell, or disclose your personal information to any other person or organization. We take reasonable measures to ensure that the personal information you provide remains secure and confidential at all times. Access to and use of our website are provided on an “as is” and “as available” basis without any warranties, either express or implied. We do not guarantee that access will always be uninterrupted or error-free. Because the internet is a public network, we cannot guarantee the completeness or accuracy of information obtained from this website, nor can we guarantee that such information is suitable for your personal financial situation. Information on this website is provided without warranties of any kind and should not be considered legal, financial, or professional advice. You should consult your independent financial, insurance, or legal advisor for advice specific to your circumstances. In no event will Super Stock or any third party be liable for any direct, indirect, incidental, or consequential damages resulting from any defect in, or use of, this website. We reserve the right to change, revise or update any content, terms or descriptions contained on this website at any time without prior notice. Trading Indian exchange or any financial instrument on margin carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade or invest, you must carefully consider your investment objectives, level of experience, and risk capacity. The possibility exists that you could lose some or all of your investment, and therefore you should never invest money you cannot afford to lose. You should be fully aware of all the risks associated with financial trading and seek advice from an independent financial advisor if you have any doubts. Trading Indian exchange or any financial instrument on margin carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade or invest, you must carefully consider your investment objectives, level of experience, and risk capacity. The possibility exists that you could lose some or all of your investment, and therefore you should never invest money you cannot afford to lose. You should be fully aware of all the risks associated with financial trading and seek advice from an independent financial advisor if you have any doubts. If you have any questions regarding this Privacy Policy or any questions about our service, please contact us directly using the official email provided on our website. I consent to receive SMS and RCS messages (updates, offers, and security OTPs). "
    }
  };

  const activeContent = content[type] || content.terms;

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
                {/* Dummy Clauses */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="text-slate-200 font-bold uppercase tracking-wider text-xs">Section {i}.0</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
                ))}
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