import { FateReading, TarotCard, DreamAnalysisResult, HoroscopeData } from "../types";

/**
 * Proxy helper to call the Netlify Function.
 */
async function callGeminiFunction(payload: any): Promise<any> {
  const response = await fetch('/.netlify/functions/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.error || "The stars are currently clouded.");
  }

  return response.json();
}

export const generateFateReading = async (directive: string, timeAnchor: string): Promise<FateReading> => {
  return callGeminiFunction({
    task: 'fate',
    data: { directive, timeAnchor }
  });
};

export const generateTarotInterpretation = async (cardName: string, isReversed: boolean): Promise<TarotCard> => {
  return callGeminiFunction({
    task: 'tarot',
    data: { cardName, isReversed }
  });
};

export const analyzeDream = async (dreamDescription: string): Promise<DreamAnalysisResult> => {
  return callGeminiFunction({
    task: 'dream',
    data: { dreamDescription }
  });
};

export const generateHoroscope = async (sign: string): Promise<HoroscopeData> => {
  return callGeminiFunction({
    task: 'horoscope',
    data: { sign }
  });
};