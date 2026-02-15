
import React, { useState } from 'react';
import { ZODIAC_SIGNS } from '../constants';
import { generateHoroscope } from '../services/geminiService';
import { HoroscopeData } from '../types';

interface HoroscopeProps {
  onBack: () => void;
}

const Horoscope: React.FC<HoroscopeProps> = ({ onBack }) => {
  const [selectedSign, setSelectedSign] = useState<typeof ZODIAC_SIGNS[0] | null>(null);
  const [data, setData] = useState<HoroscopeData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchHoroscope = async (sign: typeof ZODIAC_SIGNS[0]) => {
    setSelectedSign(sign);
    setLoading(true);
    try {
      const res = await generateHoroscope(sign.name);
      setData({ ...res, icon: sign.icon });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 bg-black overflow-y-auto">
      <button onClick={onBack} className="self-start text-xs text-purple-400 mb-8 uppercase tracking-widest hover:text-purple-300 transition-colors">← Back</button>
      
      {!selectedSign && (
        <div className="space-y-12 pb-12 max-w-5xl mx-auto w-full">
          <div className="text-center">
            <h2 className="text-4xl font-mystical text-purple-200 mb-2">The Zodiac</h2>
            <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">Select your placement</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {ZODIAC_SIGNS.map((sign) => (
              <button
                key={sign.name}
                onClick={() => fetchHoroscope(sign)}
                className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-purple-900 transition-all flex flex-col items-center text-center group"
              >
                <span className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-500">{sign.icon}</span>
                <span className="text-base text-gray-200 font-medium mb-1 tracking-wide">{sign.name}</span>
                <span className="text-[10px] text-gray-600 font-light uppercase tracking-widest">{sign.range}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {(loading || data) && selectedSign && (
        <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom duration-1000 max-w-2xl mx-auto w-full">
          <div className="w-full bg-mystic-gradient border border-purple-900/30 p-10 rounded-[3rem] relative shadow-2xl shadow-purple-950/20">
            {loading ? (
              <div className="flex flex-col items-center py-24">
                <div className="text-5xl animate-spin-slow mb-10 opacity-40">✦</div>
                <p className="text-xs text-purple-400 animate-pulse tracking-[0.3em] uppercase">Consulting the transit charts...</p>
              </div>
            ) : data && (
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-5xl font-mystical text-white">{data.name}</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2 font-medium">Today • {data.date}</p>
                  </div>
                  <span className="text-6xl text-purple-900/40 select-none">{data.icon}</span>
                </div>
                
                <div className="space-y-6 pt-8 border-t border-white/5">
                  <h4 className="text-2xl font-mystical text-purple-300 leading-snug">
                    {data.headline}
                  </h4>
                  <p className="text-gray-300 font-light leading-relaxed text-base">
                    {data.prediction}
                  </p>
                </div>
                
                <div className="pt-8 text-center sm:text-left">
                  <button 
                    onClick={() => { setSelectedSign(null); setData(null); }}
                    className="text-[10px] uppercase tracking-[0.2em] text-gray-600 hover:text-purple-400 transition-colors"
                  >
                    Check another sign
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Horoscope;
