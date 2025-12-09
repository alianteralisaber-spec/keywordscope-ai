import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SEOResult } from "../types";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API Key is missing!");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export const generateKeywords = async (niche: string, country: string, topic?: string): Promise<SEOResult> => {
  const modelId = "gemini-2.5-flash";

  const prompt = `
    Act as a professional YouTube SEO Expert for the market in "${country}".
    The user is creating content in the niche: "${niche}".
    The specific video topic is: "${topic || 'General topic related to this niche'}".

    Your task is to provide a complete YouTube Video Optimization package containing exactly 3 parts:

    1. ➤ SUGGESTED TITLES (High CTR & Search Volume):
       - Generate 5 to 10 distinct video titles.
       - Sort them from highest potential search volume to lowest.
       - Titles must be catchy, optimized for clicks, and relevant to the "${country}" audience.

    2. ➤ READY-TO-USE KEYWORDS (Tags):
       - Generate 20 to 30 SEO tags/keywords.
       - Include a mix of short-tail (high volume) and long-tail (specific) keywords.
       - STRICTLY remove all punctuation (commas, dots, hashtags).
       - Just pure text keywords suitable for the YouTube Tags section.

    3. ➤ PROFESSIONAL VIDEO DESCRIPTION:
       - Write a single professional description block (120 - 200 words).
       - Tone: Professional, engaging, and authoritative (like expert YouTubers).
       - Language: Arabic (unless the target country is strictly English speaking).
       - Must naturally integrate the most important keywords.
       - Do not include placeholders like "[Link]" or "[Social Media]". Just the content description.

    CONSTRAINTS:
    - Base all suggestions on general public search behaviors and trends in "${country}".
    - Do not invent fake search volume numbers.
    - If you are unsure about specific data, rely on broad niche patterns.
    - Output MUST be valid JSON.
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      suggestedTitles: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "List of 5-10 optimized video titles, sorted by potential volume."
      },
      keywords: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "List of 20-30 clean keywords/tags without punctuation."
      },
      suggestedDescription: {
        type: Type.STRING,
        description: "Professional video description (120-200 words)."
      }
    },
    required: ["suggestedTitles", "keywords", "suggestedDescription"]
  };

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.7,
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as SEOResult;
    }
    throw new Error("No data returned from Gemini");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};