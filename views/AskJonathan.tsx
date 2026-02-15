
import React, { useState } from 'react';
import { EIGHT_BALL_ANSWERS } from '../constants';

interface AskJonathanProps {
  onBack: () => void;
}

const AskJonathan: React.FC<AskJonathanProps> = ({ onBack }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = () => {
    if (!question.trim() || loading) return;
    
    setLoading(true);
    setAnswer('');
    
    // Simulate mystical loading
    setTimeout(() => {
      const randomAnswer = EIGHT_BALL_ANSWERS[Math.floor(Math.random() * EIGHT_BALL_ANSWERS.length)];
      setAnswer(randomAnswer);
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="flex-1 flex flex-col p-8 bg-black">
      <button onClick={onBack} className="self-start text-xs text-purple-400 mb-8 uppercase tracking-widest">Back</button>
      
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-mystical text-purple-200 mb-2">Ask Jonathan</h2>
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-12">Seek the oracle's voice</p>
        
        <div className="w-full max-w-xs space-y-8">
          <div className="relative h-64 flex items-center justify-center">
            {/* The 8-Ball / Die Visualization */}
            <div className={`w-48 h-48 bg-neutral-950 border border-white/5 rounded-full relative flex items-center justify-center transition-all duration-700
              ${loading ? 'animate-spin-slow shadow-[0_0_50px_rgba(147,51,234,0.3)] border-purple-800' : 'shadow-2xl shadow-purple-950/20'}
            `}>
              <div className="w-32 h-32 bg-black rounded-full border border-purple-900/20 flex items-center justify-center overflow-hidden">
                {!loading && !answer && <span className="text-purple-900 text-3xl">❂</span>}
                {loading && (
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 bg-purple-500 rounded-full blur-md animate-ping"></div>
                   </div>
                )}
                {answer && !loading && (
                  <p className="px-4 text-sm font-mystical text-purple-200 animate-in fade-in zoom-in duration-700 leading-tight">
                    {answer}
                  </p>
                )}
              </div>
            </div>
            {/* Visual Smoke/Steam effect placeholders */}
            <div className={`absolute -bottom-4 w-32 h-8 bg-purple-900/10 blur-3xl transition-opacity ${loading ? 'opacity-100' : 'opacity-0'}`}></div>
          </div>

          {!answer && !loading && (
            <div className="space-y-4">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question..."
                className="w-full bg-transparent border-b border-purple-900/50 p-3 text-center text-sm focus:outline-none focus:border-purple-400 transition-colors"
              />
              <button
                onClick={handleAsk}
                disabled={!question.trim()}
                className="px-10 py-3 bg-purple-950/40 border border-purple-900/50 rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-purple-900/60 transition-all disabled:opacity-30"
              >
                Ask
              </button>
            </div>
          )}

          {answer && !loading && (
            <button 
              onClick={() => { setAnswer(''); setQuestion(''); }}
              className="text-[10px] uppercase tracking-[0.2em] text-gray-600 hover:text-purple-400"
            >
              Consult again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AskJonathan;
