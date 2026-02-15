import React, { useState, useEffect } from 'react';
import { TAROT_DECK } from '../constants';
import { generateTarotInterpretation } from '../services/geminiService';
import { TarotCard } from '../types';

const CARD_BACK_URL = "https://i.ibb.co/XZpH93jt/Chat-GPT-Image-Feb-14-2026-10-52-43-PM.png";

interface TarotProps {
  onBack: () => void;
}

const Tarot: React.FC<TarotProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [card, setCard] = useState<TarotCard | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pullCard = async () => {
    if (loading) return;
    setLoading(true);
    setCard(null);
    setIsFlipped(false);
    setError(null);
    
    const randomName = TAROT_DECK[Math.floor(Math.random() * TAROT_DECK.length)];
    const isReversed = Math.random() > 0.7;
    
    try {
      const res = await generateTarotInterpretation(randomName, isReversed);
      setTimeout(() => {
        setCard(res);
        setLoading(false);
        setTimeout(() => setIsFlipped(true), 100);
      }, 2500); 
    } catch (e: any) {
      console.error(e);
      setLoading(false);
      if (e?.message?.includes('API KEY MISSING')) {
        setError(e.message);
      } else if (e?.message?.includes('429')) {
        setError("Jonathan is overwhelmed by too many seekers. Please wait 60 seconds for the stars to realign.");
      } else {
        setError("The cards are clouded: " + (e.message || "Unknown Connection Error"));
      }
    }
  };

  const handleReset = () => {
    setCard(null);
    setIsFlipped(false);
    setError(null);
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 bg-mystic-gradient overflow-y-auto">
      <button onClick={onBack} className="self-start text-xs text-purple-400 mb-8 uppercase tracking-widest hover:text-purple-300 transition-colors">← Back</button>
      
      <div className="flex-1 flex flex-col items-center">
        {!card && !loading && (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-1000">
            <h2 className="text-4xl font-mystical mb-4 text-purple-200">The Tarot</h2>
            <p className="text-sm text-gray-400 mb-6 max-w-[300px] leading-relaxed font-light">
              Clear your mind. Silently ask your question to the universe before you pull.
            </p>

            {error && (
              <div className="mb-8 p-4 border border-red-900/30 bg-red-950/10 rounded-2xl max-w-xs">
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}

            <button
              onClick={pullCard}
              className="group relative w-56 h-80 card-flip cursor-pointer focus:outline-none"
            >
              <div className="w-full h-full bg-black rounded-2xl glow-mystic transition-all group-hover:scale-105 group-hover:shadow-[0_0_50px_rgba(147,51,234,0.4)] relative overflow-hidden">
                <img 
                  src={CARD_BACK_URL} 
                  alt="Tarot Back" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                   <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white text-xl animate-pulse">✦</span>
                   </div>
                </div>
              </div>
              <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-gray-600 group-hover:text-purple-400 transition-colors">Initiate Consult</p>
            </button>
          </div>
        )}

        {(loading || card) && (
          <div className="flex-1 flex flex-col items-center w-full max-w-4xl mx-auto py-8">
            <div className={`w-64 h-96 card-flip mb-12 transition-transform duration-1000 ${loading ? 'animate-vertical-float scale-110' : ''}`}>
               <div className={`card-inner glow-mystic ${isFlipped ? 'is-flipped' : ''} ${card?.isReversed ? 'rotate-180' : ''}`}>
                 <div className="card-back bg-black border border-purple-900/40">
                    <img 
                      src={CARD_BACK_URL} 
                      alt="Tarot Back" 
                      className="w-full h-full object-cover opacity-90"
                    />
                    {loading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-purple-900/10 backdrop-blur-[2px]">
                         <div className="text-4xl text-purple-400 animate-spin-slow">❂</div>
                      </div>
                    )}
                 </div>
                 
                 <div className="card-front bg-neutral-950 border-2 border-purple-500/50 flex flex-col items-center justify-center p-6 text-center shadow-inner shadow-purple-900/20">
                    <div className="w-full h-full border border-purple-900/20 rounded-lg flex flex-col items-center justify-center space-y-4">
                       <span className="text-5xl text-purple-300">❂</span>
                       <h4 className="text-2xl font-mystical text-white px-2 leading-tight">{card?.name}</h4>
                       <div className="w-12 h-[1px] bg-purple-900/40"></div>
                       <span className="text-[8px] uppercase tracking-[0.3em] text-purple-900 font-bold">Arcana Insight</span>
                    </div>
                 </div>
               </div>
            </div>

            {loading && (
              <p className="text-xs text-purple-400 animate-pulse tracking-[0.4em] uppercase font-medium">
                Whispering to the ether...
              </p>
            )}

            {card && !loading && isFlipped && (
              <div className="w-full space-y-12 animate-in fade-in slide-in-from-bottom duration-1000 pb-20">
                <div className="text-center">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-purple-500 block mb-2 font-bold">Your Orientation</span>
                  <h3 className="text-4xl font-mystical text-white">
                    {card.name} <span className="text-gray-500 opacity-50 font-sans text-xl ml-2">{card.isReversed ? 'Reversed' : 'Upright'}</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                  <div className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black border-b border-white/10 pb-2">Traditional Definition</h4>
                    <p className="text-base text-gray-300 font-light leading-relaxed">{card.description}</p>
                  </div>
                  
                  <div className="p-8 bg-purple-900/10 rounded-[2rem] border border-purple-900/30 shadow-xl shadow-purple-950/10 flex flex-col justify-center">
                    <h4 className="text-[10px] uppercase tracking-[0.4em] text-purple-400 font-black mb-4">Grounded Interpretation</h4>
                    <p className="text-lg text-gray-100 font-light italic leading-relaxed">
                      {card.interpretation}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center pt-8">
                  <button 
                    onClick={handleReset}
                    className="text-[10px] uppercase tracking-[0.4em] text-gray-600 hover:text-purple-400 transition-colors py-4 px-10 border border-purple-900/20 hover:border-purple-500 rounded-full"
                  >
                    Reshuffle and Ask Again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tarot;