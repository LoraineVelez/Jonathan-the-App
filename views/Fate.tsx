import React, { useState, useEffect } from 'react';
import { DIRECTIVES, TIME_ANCHORS } from '../constants';
import { generateFateReading } from '../services/geminiService';
import { FateReading } from '../types';
import ShareButton from '../components/ShareButton';

interface FateProps {
  onBack: () => void;
}

const Fate: React.FC<FateProps> = ({ onBack }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [reading, setReading] = useState<FateReading | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialShuffle, setIsInitialShuffle] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Reduced from 2400ms to 1000ms for faster interaction
    const shuffleTimer = setTimeout(() => {
      setIsInitialShuffle(false);
    }, 1000);

    return () => clearTimeout(shuffleTimer);
  }, []);

  const handleSelect = async (idx: number) => {
    if (loading || selected !== null || isInitialShuffle) return;
    
    setSelected(idx);
    setLoading(true);
    setError(null);
    
    const randomDirective = DIRECTIVES[Math.floor(Math.random() * DIRECTIVES.length)];
    const randomTime = TIME_ANCHORS[Math.floor(Math.random() * TIME_ANCHORS.length)];
    
    try {
      const res = await generateFateReading(randomDirective, randomTime);
      setReading(res);
      
      // Accelerated mystical transitions
      setTimeout(() => {
        setIsOpen(true);
        setTimeout(() => {
          setShowPopup(true);
          setLoading(false);
        }, 400); // Reduced from 800ms
      }, 200); // Reduced from 500ms
      
    } catch (e: any) {
      console.error(e);
      setLoading(false);
      setError("The connection to the beyond has faded. The stars are clouded tonight.");
    }
  };

  const resetFate = () => {
    setSelected(null);
    setReading(null);
    setError(null);
    setIsOpen(false);
    setShowPopup(false);
    setIsInitialShuffle(true);
    setTimeout(() => setIsInitialShuffle(false), 1000);
  };

  const closePopup = () => {
    setSelected(null);
    setReading(null);
    setError(null);
    setIsOpen(false);
    setShowPopup(false);
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 bg-black overflow-y-auto no-scrollbar">
      <button onClick={onBack} className="self-start text-xs text-purple-400 mb-8 uppercase tracking-widest hover:text-purple-300 transition-colors">← Back</button>
      
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full relative">
        <div className={`text-center mb-16 transition-opacity duration-500 ${selected !== null ? 'opacity-0' : 'opacity-100'}`}>
          <h2 className="text-4xl font-mystical mb-2 text-purple-200">Seal Your Fate</h2>
          <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">The truth is sealed within. Select one.</p>
        </div>
        
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-12 w-full px-4 transition-all duration-1000 ${selected !== null ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100'}`}>
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`aspect-[4/3] relative cursor-pointer group ${isInitialShuffle ? `animate-shuffle-${idx}` : 'animate-vertical-float'}`}
              style={{ animationDelay: !isInitialShuffle ? `${idx * 0.15}s` : '0s' }}
            >
              <div className="envelope rounded-sm group-hover:border-purple-500 group-hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all">
                <div className="envelope-flap"></div>
                <div className="envelope-body flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-purple-900/30 border border-purple-500/50 flex items-center justify-center">
                     <span className="text-[10px] text-purple-300 opacity-50">❂</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="mt-8 p-6 border border-purple-900/30 bg-purple-950/5 rounded-2xl max-w-sm text-center animate-in fade-in">
            <p className="text-sm text-purple-300/80 italic mb-4">{error}</p>
            <button onClick={resetFate} className="text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-colors border border-white/20 px-4 py-2 rounded-full">
              Seek Re-Selection
            </button>
          </div>
        )}

        {selected !== null && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
            <div className={`w-64 sm:w-80 aspect-[4/3] relative transition-transform duration-1000 ${showPopup ? 'translate-y-24 scale-75 opacity-50' : 'scale-110'}`}>
              <div className={`envelope rounded-lg ${isOpen ? 'is-open' : ''} glow-mystic`}>
                <div className="envelope-flap"></div>
                <div className="letter rounded-md shadow-2xl"></div>
                <div className="envelope-body rounded-b-lg"></div>
              </div>
            </div>

            {loading && !showPopup && (
              <div className="mt-8 text-xs text-purple-400 animate-pulse tracking-[0.4em] uppercase font-medium">
                Unsealing your destiny...
              </div>
            )}

            {showPopup && reading && (
              <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 py-20 bg-black/80 backdrop-blur-sm animate-in fade-in duration-500 overflow-y-auto no-scrollbar">
                <div className="max-w-xl w-full flex flex-col items-center gap-6">
                  <div id="fate-result" className="w-full p-8 sm:p-12 border border-purple-900/50 bg-mystic-gradient rounded-[2.5rem] space-y-10 shadow-2xl animate-in slide-in-from-bottom-12 duration-700 relative">
                    <button onClick={closePopup} className="absolute top-6 right-8 text-gray-500 hover:text-purple-400 transition-colors text-xl font-light">✕</button>
                    <div className="space-y-4 text-center">
                      <span className="text-[10px] uppercase tracking-[0.4em] text-purple-500 font-black">The Directives of Jonathan</span>
                      <h3 className="text-5xl font-mystical text-white tracking-widest">{reading.directive}</h3>
                    </div>
                    <div className="space-y-8 text-center">
                      <p className="text-xl sm:text-2xl text-gray-100 leading-relaxed font-light italic">"{reading.fate}"</p>
                      <div className="pt-8 border-t border-purple-900/30 max-w-[200px] mx-auto">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 block mb-2">Temporal Anchor</span>
                        <p className="text-purple-300 uppercase tracking-[0.2em] text-sm font-bold">{reading.timeAnchor}</p>
                      </div>
                    </div>
                    <div className="bg-purple-900/10 p-6 rounded-3xl border border-purple-500/20">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-purple-400 block mb-3 font-black text-center">Signal from Jonathan</span>
                      <p className="text-sm text-gray-400 leading-relaxed font-light italic text-center whitespace-pre-line">{reading.sign}</p>
                    </div>
                  </div>
                  <ShareButton 
                    elementId="fate-result" 
                    title="My Fate Unsealed" 
                    text={`Jonathan has unsealed my destiny: ${reading.directive}. See what yours holds.`} 
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Fate;