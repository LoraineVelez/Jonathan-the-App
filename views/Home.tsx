
import React, { useEffect, useState } from 'react';

interface HomeProps {
  onBegin: () => void;
}

const Home: React.FC<HomeProps> = ({ onBegin }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setOpacity(1), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="flex-1 flex flex-col items-center justify-center p-8 text-center transition-opacity duration-1000 bg-mystic-gradient"
      style={{ opacity }}
    >
      <h1 className="text-6xl font-mystical tracking-widest uppercase mb-4 glow-purple">
        Jonathan
      </h1>
      <p className="text-purple-300/60 font-light mb-12 tracking-wide text-sm">
        More than a scryer. Your destiny guide.
      </p>
      
      <button 
        onClick={onBegin}
        className="group relative px-8 py-4 bg-transparent border border-purple-900/40 rounded-full overflow-hidden transition-all hover:border-purple-500"
      >
        <span className="relative z-10 text-xs tracking-widest uppercase font-semibold group-hover:text-purple-200">
          Begin
        </span>
        <div className="absolute inset-0 bg-purple-900/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
      </button>
      
      <p className="mt-8 text-xs text-gray-600 font-light italic">
        "Interpret your present, understand your future."
      </p>
    </div>
  );
};

export default Home;
