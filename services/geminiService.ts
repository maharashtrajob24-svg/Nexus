import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMarketingCopy = async (
  topic: string,
  tone: string,
  platform: string
): Promise<string> => {
  try {
    const prompt = `
      You are an expert digital marketing copywriter. 
      Create a compelling ${platform} post about: ${topic}.
      Tone: ${tone}.
      Keep it engaging, use emojis where appropriate, and include 3 relevant hashtags.
      Do not include any preamble, just the copy.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a world-class creative director.",
        temperature: 0.7,
      }
    });

    return response.text || "No content generated.";
  } catch (error) {
    console.error("Error generating copy:", error);
    throw new Error("Failed to generate marketing copy. Please check your API key and try again.");
  }
};

export const generateAdImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: `Professional digital marketing advertisement visuals: ${prompt}, high quality, 4k, photorealistic or modern vector art style depending on context`,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1', // Square for social media
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    
    throw new Error("No image generated");
  } catch (error) {
    console.error("Error generating image:", error);
    // Fallback if Image generation fails (or model not available to user key)
    // We re-throw to let the UI handle the error state
    throw error; 
  }
};
