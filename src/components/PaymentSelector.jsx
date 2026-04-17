import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CreditCard, Landmark, QrCode, Smartphone } from 'lucide-react';

const PAYMENTS = [
  { id: 0, name: "UPI", icon: <Smartphone />, desc: "Instant transfer via phone" },
  { id: 1, name: "Credit/Debit Card", icon: <CreditCard />, desc: "Visa, Mastercard, Rupay" },
  { id: 2, name: "Bank Transfer", icon: <Landmark />, desc: "NEFT, RTGS, IMPS" },
  { id: 3, name: "QR Scanner", icon: <QrCode />, desc: "Scan and pay instantly" },
];

export default function PaymentSelector() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % PAYMENTS.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + PAYMENTS.length) % PAYMENTS.length);

  return (
    <section className="py-20 bg-[#020617] overflow-hidden flex flex-col items-center">
      <div className="text-center mb-16">
        <h1 className="text-white text-5xl font-extrabold mb-2">Flexible Payments</h1>
        <p className="text-slate-500">Choose your preferred funding method</p>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-5xl px-10">
        
        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 z-20">
          <button onClick={prev} className="p-3 rounded-full bg-slate-900 border border-slate-800 text-white hover:border-indigo-500 transition-colors">
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20">
          <button onClick={next} className="p-3 rounded-full bg-slate-900 border border-slate-800 text-white hover:border-indigo-500 transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* The Sliding Track */}
        <div className="flex justify-center items-center h-[350px]">
          <motion.div 
            className="flex gap-8 absolute"
            animate={{ x: -(activeIndex * 332) + (332 * 1.5) }} // Adjusting offset to keep active in view
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {PAYMENTS.map((payment, i) => {
              const isActive = activeIndex === i;
              return (
                <motion.div
                  key={payment.id}
                  animate={{ 
                    y: isActive ? -40 : 0, 
                    scale: isActive ? 1.1 : 0.9,
                    opacity: isActive ? 1 : 0.4,
                    rotateY: isActive ? 0 : -70,
                  }}
                  transition={{ type: "keyframes", duration: 0.1, stiffness: 100, damping: 15 }}
                  className={`
                    flex-shrink-0 w-[300px] p-8 rounded-[2rem] border transition-all duration-500
                    ${isActive 
                      ? 'bg-slate-900 border-indigo-500 shadow-[0_20px_50px_rgba(99,102,241,0.2)]' 
                      : 'bg-slate-900/40 border-slate-800 shadow-none'}
                  `}
                >
                  <div className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center mb-6
                    ${isActive ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-500'}
                  `}>
                    {React.cloneElement(payment.icon, { size: 28 })}
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-white' : 'text-slate-500'}`}>
                    {payment.name}
                  </h3>
                  <p className={`text-sm ${isActive ? 'text-slate-400' : 'text-slate-600'}`}>
                    {payment.desc}
                  </p>

                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="mt-6 pt-6 border-t border-slate-800 text-indigo-400 text-xs font-bold tracking-widest uppercase"
                    >
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex gap-2 mt-8">
        {PAYMENTS.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-800'}`} 
          />
        ))}
      </div>
    </section>
  );
}