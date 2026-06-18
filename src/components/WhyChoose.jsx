import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  UserPlus, 
  ArrowLeftRight, 
  Percent, 
  Zap, 
  Headphones, 
  MousePointerClick, 
  EyeOff, 
  MessageSquare, 
  TrendingUp 
} from 'lucide-react';
import { whyChooseContent } from '../content/whyChoose.js';

const ICON_MAP = {
  Wallet,
  UserPlus,
  ArrowLeftRight,
  Percent,
  Zap,
  Headphones,
  MousePointerClick,
  EyeOff,
  MessageSquare,
  TrendingUp
};

const FeatureCard = ({ icon: Icon, text, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.02, backgroundColor: "rgba(99, 102, 241, 0.1)" }}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '16px 24px',
      background: 'rgba(30, 41, 59, 0.4)', // Slate-800/40
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(148, 163, 184, 0.1)', // Slate-400/10
      borderRadius: '16px',
      cursor: 'default',
      transition: 'all 0.1s ease',
    }}
  >
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      background: 'rgba(99, 102, 241, 0.15)', // Indigo glow
      color: '#6366f1' // Indigo-500
    }}>
      {Icon && <Icon size={20} />}
    </div>
    <span style={{
      color: '#f1f5f9', // Slate-100
      fontSize: '15px',
      fontWeight: '500',
      letterSpacing: '-0.01em'
    }}>
      {text}
    </span>
  </motion.div>
);

export default function WhyChoose() {
  return (
    <section style={{
      padding: '100px 5%',
      position: 'relative',
      background: '#020617', // Match your dark theme
      overflow: 'hidden'
    }}>
      {/* Subtle Background Glows */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '-10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '100px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              color: '#a5b4fc',
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '16px'
            }}
          >
            {whyChooseContent.badge}
          </motion.div>
          
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: '800',
            color: '#fff',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            {whyChooseContent.headingPrefix}<span style={{ color: '#6366f1' }}>{whyChooseContent.headingHighlight}</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            {whyChooseContent.description}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          {whyChooseContent.features.map((item, index) => (
            <FeatureCard 
              key={index} 
              icon={ICON_MAP[item.iconId]} 
              text={item.text} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}