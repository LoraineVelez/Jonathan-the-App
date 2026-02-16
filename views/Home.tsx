import React from 'react';

interface HomeProps {
  onBegin: () => void;
}

const Home: React.FC<HomeProps> = ({ onBegin }) => {
  return (
    <div 
      className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 text-center safe-top safe-bottom"
    >
      <div className="animate-fade-reveal w-full max-w-4xl mx-auto flex flex-col items-center -mt-16 sm:mt-0">
        <div className="space-y-4 sm:space-y-6 w-full px-2 flex flex-col items-center">
          {/* 
            Increased font sizes: 
            - 6xl on small mobile (~60px)
            - 8xl on medium (~96px)
            - 9xl+ on desktop
            Negative margin-right equal to tracking fixes the optical centering issue caused by trailing letter space.
          */}
          <h1 className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-mystical tracking-[0.15em] sm:tracking-[0.25em] uppercase glow-purple leading-[0.9] break-words mr-[-0.15em] sm:mr-[-0.25em]">
            Jonathan
          </h1>
          <p className="text-purple-300/50 font-light tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs uppercase max-w-[280px] sm:max-w-none">
            More than a scryer. Your destiny guide.
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-14 sm:gap-24 mt-16 sm:mt-24">
          <button 
            onClick={onBegin}
            className="group relative px-12 sm:px-16 py-5 sm:py-6 bg-transparent border border-purple-900/40 rounded-full overflow-hidden transition-all hover:border-purple-500 hover:shadow-[0_0_40px_rgba(147,51,234,0.4)] active:scale-95"
          >
            <span className="relative z-10 text-[10px] sm:text-xs tracking-[0.5em] uppercase font-bold group-hover:text-purple-100 mr-[-0.5em]">
              Begin Consultation
            </span>
            <div className="absolute inset-0 bg-purple-900/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
          
          <div className="space-y-4 opacity-20 px-6">
            <p className="text-[9px] sm:text-[11px] text-gray-400 font-light italic tracking-[0.3em] uppercase max-w-[220px] sm:max-w-[300px] leading-loose mx-auto">
              "Interpret your present, understand your future."
            </p>
            <div className="w-10 h-[1px] bg-purple-900/60 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;