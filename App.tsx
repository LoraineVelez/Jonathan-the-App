
import React, { useState, useEffect } from 'react';
import { View } from './types';
import Home from './views/Home';
import Menu from './views/Menu';
import Fate from './views/Fate';
import Tarot from './views/Tarot';
import Horoscope from './views/Horoscope';
import DreamAnalysis from './views/DreamAnalysis';
import AskJonathan from './views/AskJonathan';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Home);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderView = () => {
    switch (currentView) {
      case View.Home:
        return <Home onBegin={() => setCurrentView(View.Menu)} />;
      case View.Menu:
        return <Menu onSelectView={setCurrentView} />;
      case View.Fate:
        return <Fate onBack={() => setCurrentView(View.Menu)} />;
      case View.Tarot:
        return <Tarot onBack={() => setCurrentView(View.Menu)} />;
      case View.Horoscope:
        return <Horoscope onBack={() => setCurrentView(View.Menu)} />;
      case View.DreamAnalysis:
        return <DreamAnalysis onBack={() => setCurrentView(View.Menu)} />;
      case View.AskJonathan:
        return <AskJonathan onBack={() => setCurrentView(View.Menu)} />;
      default:
        return <Home onBegin={() => setCurrentView(View.Menu)} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 selection:bg-purple-900/30 overflow-x-hidden">
      <div className="w-full max-w-6xl mx-auto min-h-screen flex flex-col relative px-4 sm:px-8">
        {renderView()}
      </div>
    </div>
  );
};

export default App;
