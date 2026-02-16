import React from 'react';

interface HomeProps {
  onBegin: () => void;
}

const Home: React.FC<HomeProps> = ({ onBegin }) => {
  return (
    <div 
      className="flex-1 flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="animate-fade-reveal space-y-4 max-w-2xl mx-auto">
        <h1 className="text-6xl sm:text-7xl font-mystical tracking-widest uppercase mb-4 glow-purple">
          Jonathan
        </h1>
        <p className="text-purple-300/60 font-light mb-12 tracking-wide text-sm">
          More than a scryer. Your destiny guide.
        </p>
        
        <div className="flex flex-col items-center gap-12 mt-12">
          <button 
            onClick={onBegin}
            className="group relative px-10 py-5 bg-transparent border border-purple-900/40 rounded-full overflow-hidden transition-all hover:border-purple-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.2)]"
          >
            <span className="relative z-10 text-xs tracking-[0.4em] uppercase font-semibold group-hover:text-purple-200">
              Begin Consultation
            </span>
            <div className="absolute inset-0 bg-purple-900/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
          
          <div className="space-y-2 opacity-40">
            <p className="text-[10px] text-gray-500 font-light italic tracking-widest uppercase">
              "Interpret your present, understand your future."
            </p>
            <div className="w-12 h-[1px] bg-purple-900/40 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;