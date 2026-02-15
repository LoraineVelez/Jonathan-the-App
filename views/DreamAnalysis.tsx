
import React, { useState } from 'react';
import { analyzeDream } from '../services/geminiService';
import { DreamAnalysisResult } from '../types';

interface DreamAnalysisProps {
  onBack: () => void;
}

const DreamAnalysis: React.FC<DreamAnalysisProps> = ({ onBack }) => {
  const [dream, setDream] = useState('');
  const [result, setResult] = useState<DreamAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dream.trim() || loading) return;
    
    setLoading(true);
    setError(null);
    try {
      const res = await analyzeDream(dream);
      setResult(res);
    } catch (err: any) {
      console.error(err);
      if (err?.message?.includes('429')) {
        setError("The collective subconscious is currently crowded. Please wait 60 seconds before consulting Jonathan again.");
      } else {
        setError("Jonathan could not decipher this vision. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 bg-black overflow-y-auto">
      <button onClick={onBack} className="self-start text-xs text-purple-400 mb-8 uppercase tracking-widest hover:text-purple-300">← Back</button>
      
      {!result ? (
        <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-mystical text-purple-200 mb-2">Dream Analysis</h2>
            <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">Unlock the language of your mind</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <textarea
                value={dream}
                onChange={(e) => setDream(e.target.value)}
                placeholder="Describe your dream here. Be specific about symbols, feelings, and events..."
                className="w-full h-64 bg-white/5 border border-white/10 rounded-[2rem] p-8 text-base text-gray-200 focus:outline-none focus:border-purple-800/50 resize-none transition-all placeholder:text-gray-700 font-light leading-relaxed"
                disabled={loading}
              />
              {loading && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md rounded-[2rem] flex flex-col items-center justify-center space-y-6">
                  <div className="w-12 h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs text-purple-400 uppercase tracking-[0.3em] font-medium animate-pulse">Deconstructing your symbols...</span>
                </div>
              )}
            </div>

            {error && (
              <div className="p-6 border border-red-900/30 bg-red-950/10 rounded-3xl text-center">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={!dream.trim() || loading}
              className="w-full py-5 bg-purple-950 text-purple-200 rounded-full text-xs font-bold uppercase tracking-[0.3em] hover:bg-purple-900 transition-all disabled:opacity-30 hover:shadow-[0_0_30px_rgba(147,51,234,0.1)]"
            >
              Consult Jonathan
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-1 pb-16 space-y-12 animate-in fade-in duration-1000 max-w-4xl mx-auto w-full">
          <div className="text-center">
            <h3 className="text-4xl font-mystical text-white mb-2">Interpretation</h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-bold">Psychological Dictionary Mode</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <section className="space-y-6">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-purple-500 font-black border-b border-purple-900/20 pb-2">Symbol Inventory</h4>
                <div className="space-y-6">
                  {result.symbols.map((sym, idx) => (
                    <div key={idx} className="space-y-2 group">
                      <p className="text-lg font-mystical text-white group-hover:text-purple-300 transition-colors">{sym.name}</p>
                      <p className="text-sm text-gray-400 font-light leading-relaxed italic">{sym.meaning}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <section className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-purple-500 font-black border-b border-purple-900/20 pb-2">Subconscious Signal</h4>
                <p className="text-base text-gray-300 leading-relaxed font-light">{result.suggestion}</p>
              </section>

              <section className="p-8 bg-purple-900/10 border border-purple-900/20 rounded-[2rem] space-y-4 shadow-xl shadow-purple-950/10">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-purple-300 font-black">Jonathan Recommends</h4>
                <p className="text-lg text-white font-light italic leading-relaxed">{result.recommendation}</p>
              </section>
            </div>
          </div>

          <div className="text-center pt-8">
            <button 
              onClick={() => { setResult(null); setDream(''); setError(null); }}
              className="text-[10px] uppercase tracking-[0.3em] text-gray-600 hover:text-purple-400 border border-transparent hover:border-purple-900/30 px-8 py-4 rounded-full transition-all"
            >
              Analyze another dream
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DreamAnalysis;
