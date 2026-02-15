
import { GoogleGenAI, Type } from "@google/genai";
import { FateReading, TarotCard, DreamAnalysisResult, HoroscopeData } from "../types";

/**
 * Lazily initialize the Gemini client to avoid top-level crashes 
 * during application mount if the API key is not yet available.
 */
const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Jonathan is silent. (API Key not configured in environment)");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Helper to retry API calls with exponential backoff when hitting rate limits (429).
 */
async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 2000): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    const isRateLimit = error?.message?.includes('429') || error?.status === 429;
    if (retries > 0 && isRateLimit) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

export const generateFateReading = async (directive: string, timeAnchor: string): Promise<FateReading> => {
  const ai = getAI();
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a fate reading for a user.
      Directive: ${directive}
      Time Anchor: ${timeAnchor}
      Tone: Realistic, grounded, direct, not cruel, not dramatic, psychologically insightful.
      Language: 8th grade English.
      
      CRITICAL: For the "sign", follow this exact structure:
      "Observe This Signal: [common object or situation]. Look for: [where to realistically find it]. Meaning: [grounded interpretation about habits or choices]."
      
      Output: JSON only.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fate: { type: Type.STRING, description: 'Realistic fate statement related to life, career, or love.' },
            sign: { type: Type.STRING, description: 'Structured signal: Observe This Signal: ... Look for: ... Meaning: ...' }
          },
          required: ["fate", "sign"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Jonathan is silent. No response text received.");

    const data = JSON.parse(text);
    return {
      directive,
      timeAnchor,
      fate: data.fate,
      sign: data.sign
    };
  });
};

export const generateTarotInterpretation = async (cardName: string, isReversed: boolean): Promise<TarotCard> => {
  const ai = getAI();
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the Tarot card "${cardName}" ${isReversed ? '(Reversed)' : '(Upright)'}.
      Include a "description" (traditional matter-of-fact definition) and "interpretation" (grounded, practical real life meaning in calm modern language).
      Language: 8th grade English.
      Output: JSON only.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            interpretation: { type: Type.STRING }
          },
          required: ["description", "interpretation"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Jonathan is silent. No response text received.");

    const data = JSON.parse(text);
    return {
      name: cardName,
      isReversed,
      description: data.description,
      interpretation: data.interpretation
    };
  });
};

export const analyzeDream = async (dreamDescription: string): Promise<DreamAnalysisResult> => {
  const ai = getAI();
  return withRetry(async () => {
    // Switching to gemini-3-flash-preview as it has higher quota limits than Pro on free tier
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this dream in a structured dictionary format: "${dreamDescription}".
      1. Identify key symbols and define them psychologically (no mysticism).
      2. Suggest what this indicates about the dreamer's stress/career/relationships.
      3. Provide a practical "Jonathan Recommends" action step.
      Language: 8th grade English.
      Output: JSON only.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            symbols: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  meaning: { type: Type.STRING }
                }
              }
            },
            suggestion: { type: Type.STRING },
            recommendation: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Jonathan is silent. No response text received.");

    return JSON.parse(text);
  });
};

export const generateHoroscope = async (sign: string): Promise<HoroscopeData> => {
  const ai = getAI();
  const today = new Date().toLocaleDateString();
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a horoscope for ${sign} for today (${today}).
      Style: Co-Star style, matter-of-fact, based on current planetary transits.
      Tone: Dry, analytical, modern.
      Language: 8th grade English.
      Output: JSON only.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING, description: 'One line summary headline.' },
            prediction: { type: Type.STRING, description: 'One short paragraph.' }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Jonathan is silent. No response text received.");

    const data = JSON.parse(text);
    return {
      name: sign,
      date: today,
      headline: data.headline,
      prediction: data.prediction,
      icon: '' // to be filled from constants
    };
  });
};
