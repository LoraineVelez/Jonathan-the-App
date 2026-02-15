
export enum View {
  Home = 'home',
  Menu = 'menu',
  Fate = 'fate',
  Tarot = 'tarot',
  Horoscope = 'horoscope',
  DreamAnalysis = 'dream',
  AskJonathan = 'ask'
}

export interface TarotCard {
  name: string;
  isReversed: boolean;
  description: string;
  interpretation: string;
}

export interface FateReading {
  directive: string;
  fate: string;
  timeAnchor: string;
  sign: string;
}

export interface DreamAnalysisResult {
  symbols: { name: string; meaning: string }[];
  suggestion: string;
  recommendation: string;
}

export interface HoroscopeData {
  name: string;
  date: string;
  headline: string;
  prediction: string;
  icon: string;
}
