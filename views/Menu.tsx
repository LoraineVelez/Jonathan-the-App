
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
    <div className="flex-1 flex flex-col p-4 sm:p-8 pt-16 bg-mystic-gradient overflow-y-auto">
      <h2 className="text-4xl sm:text-5xl font-mystical mb-16 text-center text-purple-200">Your Consultation</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => onSelectView(item.id)}
            className="w-full p-8 text-left border border-white/5 bg-white/5 rounded-3xl hover:bg-white/10 transition-all hover:border-purple-800/50 group animate-in slide-in-from-bottom"
            style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-mystical text-gray-100 group-hover:text-purple-300 transition-colors">{item.label}</span>
              <span className="text-purple-900 group-hover:text-purple-500 transition-all transform group-hover:translate-x-1">→</span>
            </div>
            <p className="text-[10px] text-gray-500 font-light uppercase tracking-[0.2em]">{item.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
