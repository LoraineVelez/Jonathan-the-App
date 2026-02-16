import React from 'react';

interface HomeProps {
  onBegin: () => void;
}

const Home: React.FC<HomeProps> = ({ onBegin }) => {
  return (
    <div 
      className="flex-1 flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="animate-fade-reveal w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        <div className="space-y-6 sm:space-y-10 w-full px-4 flex flex-col items-center">
          {/* 
            Title Responsiveness Fix:
            1. Use `vw` (viewport width) units for the smallest screens to ensure it never exceeds container width.
            2. Scale to fixed Tailwind sizes for larger breakpoints.
            3. Dynamic tracking: tighter on mobile, wider on desktop.
            4. Negative margin-right balances the tracking for precise optical centering.
          */}
          <h1 className="text-[14vw] xs:text-[15vw] sm:text-9xl md:text-[10rem] lg:text-[12rem] font-mystical tracking-[0.1em] sm:tracking-[0.2em] uppercase glow-purple leading-none whitespace-nowrap mr-[-0.1em] sm:mr-[-0.2em]">
            Jonathan
          </h1>
          <p className="text-purple-300/40 font-light tracking-[0.2em] sm:tracking-[0.4em] text-[9px] xs:text-[10px] sm:text-xs uppercase max-w-[260px] xs:max-w-none">
            More than a scryer. Your destiny guide.
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-14 sm:gap-24 mt-20 sm:mt-32">
          <button 
            onClick={onBegin}
            className="group relative px-12 xs:px-16 sm:px-24 py-5 xs:py-6 sm:py-8 bg-transparent border border-purple-900/30 rounded-full overflow-hidden transition-all hover:border-purple-500 hover:shadow-[0_0_60px_rgba(147,51,234,0.4)] active:scale-95"
          >
            <span className="relative z-10 text-[9px] xs:text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.6em] uppercase font-bold group-hover:text-purple-100 mr-[-0.4em] sm:mr-[-0.6em]">
              Begin Consultation
            </span>
            <div className="absolute inset-0 bg-purple-900/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
          
          <div className="space-y-4 opacity-20 px-6">
            <p className="text-[8px] xs:text-[9px] sm:text-[11px] text-gray-400 font-light italic tracking-[0.2em] sm:tracking-[0.3em] uppercase max-w-[200px] xs:max-w-[280px] sm:max-w-[360px] leading-loose mx-auto">
              "Interpret your present, understand your future."
            </p>
            <div className="w-10 xs:w-12 h-[1px] bg-purple-900/40 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;