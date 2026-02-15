
import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { GoogleGenAI, Type } from "@google/genai";

// API key logic updated to strictly follow guidelines
const cleanJsonResponse = (text: string): string => {
  return text.replace(/```json\n?|```/g, "").trim();
};

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { task, data } = JSON.parse(event.body || '{}');
    // Always use process.env.API_KEY directly for initializing GoogleGenAI
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    let responseText = '';
    
    switch (task) {
      case 'fate': {
        const { directive, timeAnchor } = data;
        const result = await ai.models.generateContent({
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
        // Accessing the extracted text using the .text property
        responseText = result.text || '';
        const parsed = JSON.parse(cleanJsonResponse(responseText));
        return {
          statusCode: 200,
          body: JSON.stringify({ ...parsed, directive, timeAnchor })
        };
      }

      case 'tarot': {
        const { cardName, isReversed } = data;
        const result = await ai.models.generateContent({
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
        // Accessing the extracted text using the .text property
        responseText = result.text || '';
        const parsed = JSON.parse(cleanJsonResponse(responseText));
        return {
          statusCode: 200,
          body: JSON.stringify({ ...parsed, name: cardName, isReversed })
        };
      }

      case 'dream': {
        const { dreamDescription } = data;
        const result = await ai.models.generateContent({
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
        // Accessing the extracted text using the .text property
        responseText = result.text || '';
        return {
          statusCode: 200,
          body: cleanJsonResponse(responseText)
        };
      }

      case 'horoscope': {
        const { sign } = data;
        const today = new Date().toLocaleDateString();
        const result = await ai.models.generateContent({
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
        // Accessing the extracted text using the .text property
        responseText = result.text || '';
        const parsed = JSON.parse(cleanJsonResponse(responseText));
        return {
          statusCode: 200,
          body: JSON.stringify({ ...parsed, name: sign, date: today })
        };
      }

      default:
        return { statusCode: 400, body: JSON.stringify({ error: 'Unknown task' }) };
    }
  } catch (error: any) {
    console.error('Gemini Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Internal Server Error" })
    };
  }
};
