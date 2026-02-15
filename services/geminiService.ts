import { GoogleGenAI, Type } from "@google/genai";
import { FateReading, TarotCard, DreamAnalysisResult, HoroscopeData } from "../types";

/**
 * Lazily initialize the Gemini client.
 */
const getAI = () => {
  const apiKey = process.env.API_KEY;
  // Use mystical phrasing for errors to keep Jonathan in character.
  if (!apiKey || apiKey === "null" || apiKey === "undefined" || apiKey === "") {
    throw new Error("The stars are currently clouded.");
  }
  return new GoogleGenAI({ apiKey: apiKey as string });
};

/**
 * Helper to clean JSON strings from the model.
 */
const cleanJsonResponse = (text: string) => {
  return text.replace(/```json\n?|```/g, "").trim();
};

/**
 * Helper to retry API calls with exponential backoff.
 */
async function withRetry<T>(fn: () => Promise<T>, retries = 2, delay = 1500): Promise<T> {
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
      contents: {
        parts: [{
          text: `Generate a fate reading for a user.
          Directive: ${directive}
          Time Anchor: ${timeAnchor}
          Tone: Realistic, grounded, direct, psychologically insightful.
          Language: 8th grade English.
          Output: JSON only.`
        }]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fate: { type: Type.STRING },
            sign: { type: Type.STRING }
          },
          required: ["fate", "sign"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Jonathan is deep in thought.");
    }

    const data = JSON.parse(cleanJsonResponse(text));
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
      contents: {
        parts: [{
          text: `Analyze the Tarot card "${cardName}" ${isReversed ? '(Reversed)' : '(Upright)'}.
          Include a "description" and "interpretation" in grounded, practical real life meaning.
          Output: JSON only.`
        }]
      },
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
    if (!text) {
      throw new Error("The stars are silent.");
    }

    const data = JSON.parse(cleanJsonResponse(text));
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
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [{
          text: `Analyze this dream psychologically: "${dreamDescription}". Output JSON only.`
        }]
      },
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
                },
                required: ["name", "meaning"]
              }
            },
            suggestion: { type: Type.STRING },
            recommendation: { type: Type.STRING }
          },
          required: ["symbols", "suggestion", "recommendation"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("The subconscious veil is too thick.");
    }

    return JSON.parse(cleanJsonResponse(text));
  });
};

export const generateHoroscope = async (sign: string): Promise<HoroscopeData> => {
  const ai = getAI();
  const today = new Date().toLocaleDateString();
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [{
          text: `Write a modern, matter-of-fact horoscope for ${sign} for today. Output JSON.`
        }]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            prediction: { type: Type.STRING }
          },
          required: ["headline", "prediction"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("The transit charts are obscured.");
    }

    const data = JSON.parse(cleanJsonResponse(text));
    return {
      name: sign,
      date: today,
      headline: data.headline,
      prediction: data.prediction,
      icon: '' 
    };
  });
};