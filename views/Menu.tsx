import React from 'react';
import { View } from '../types';

interface MenuProps {
  onSelectView: (view: View) => void;
}

const Menu: React.FC<MenuProps> = ({ onSelectView }) => {
  const items = [
    { id: View.Fate, label: 'Fate', desc: 'Seal your destiny' },
    { id: View.Tarot, label: 'Tarot', desc: 'Ask the cards' },
    { id: View.Horoscope, label: 'Horoscope', desc: 'Read the stars' },
    { id: View.DreamAnalysis, label: 'Dream Analysis', desc: 'Unlock symbols' },
    { id: View.AskJonathan, label: 'Ask Jonathan', desc: 'Seek clarity' }
  ];

  return (
    <div className="flex-1 flex flex-col p-5 sm:p-12 pt-16 sm:pt-24 overflow-y-auto no-scrollbar">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl sm:text-5xl font-mystical mb-12 sm:mb-16 text-center text-purple-100 glow-purple">Your Consultation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className="w-full p-7 sm:p-8 text-left border border-white/10 bg-white/5 rounded-[2rem] hover:bg-white/10 active:scale-[0.98] transition-all hover:border-purple-500/30 group animate-in slide-in-from-bottom duration-700"
              style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl font-mystical text-gray-100 group-hover:text-purple-200 transition-colors tracking-wide">{item.label}</span>
                <span className="text-purple-900 group-hover:text-purple-400 transition-all transform group-hover:translate-x-1">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-gray-500 font-semibold uppercase tracking-[0.25em]">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;