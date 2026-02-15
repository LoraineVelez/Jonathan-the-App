
import React, { useState, useEffect } from 'react';

const PHRASES = [
  "The ether is thin tonight...",
  "Consulting the stars...",
  "Gathering the whispers...",
  "The void awaits your presence...",
  "Jonathan is sensing you..."
];

const MysticalLoader: React.FC = () => {
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fix: arrays use .length, not .size
      setPhraseIdx((prev) => (prev + 1) % PHRASES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100] overflow-hidden">
      {/* Background Nebulae */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full animate-pulse-mystic"></div>
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-green-900/5 blur-[100px] rounded-full animate-pulse-mystic" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-900/5 blur-[100px] rounded-full animate-pulse-mystic" style={{ animationDelay: '4s' }}></div>

      {/* Central Sigil */}
      <div className="relative mb-12 flex items-center justify-center">
        <div className="absolute inset-0 border-2 border-purple-500/20 rounded-full scale-[2.5] animate-spin-slow"></div>
        <div className="absolute inset-0 border border-purple-900/10 rounded-full scale-[1.8] animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }}></div>
        
        {/* Orbital Particles */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="orbiting-particle" 
            style={{ 
              animation: `orbit ${8 + i}s linear infinite`,
              animationDelay: `-${i * 1.5}s`
            }}
          ></div>
        ))}

        <span className="text-8xl text-purple-400/60 font-mystical animate-pulse relative z-10 glow-purple">
          ❂
        </span>
      </div>

      {/* Whispered Phrases */}
      <div className="h-8 flex items-center justify-center">
        <p className="text-xs uppercase tracking-[0.5em] text-purple-300/40 font-light italic transition-opacity duration-1000 animate-pulse">
          {PHRASES[phraseIdx]}
        </p>
      </div>

      <div className="mt-24 w-48 h-[1px] bg-gradient-to-r from-transparent via-purple-900/40 to-transparent"></div>
    </div>
  );
};

export default MysticalLoader;
