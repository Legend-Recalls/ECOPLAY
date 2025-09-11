import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { GeminiResponse } from '../types';

// ###################################################################
// IMPORTANT: REPLACE 'YOUR_API_KEY_HERE' WITH YOUR ACTUAL GEMINI API KEY
// ###################################################################
const API_KEY = 'AIzaSyChh_oQm3a-qyten6LaqUmpnXqD1XLQs8s';

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to convert a data URL to a GenerativePart
function fileToGenerativePart(dataUrl: string) {
  // Expected format: "data:[<mediatype>];base64,[<data>]"
  const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!match) {
    throw new Error("Invalid data URL format");
  }
  return {
    inlineData: {
      data: match[2],
      mimeType: match[1],
    },
  };
}

export const getEcoGuidance = async (imageDataUrl: string): Promise<GeminiResponse> => {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    console.error("API key is missing. Please add it to src/utils/geminiAPI.ts");
    // Return a mock response to prevent app crash
    return {
      guidance: "API Key is missing. Please add your Gemini API key to the code to enable this feature.",
      quiz: {
        question: "How do you get a Gemini API key?",
        options: ["Google AI Studio", "From a friend", "Nowhere"],
        correctAnswer: "Google AI Studio",
      },
    };
  }

  console.log("Sending image to Gemini for analysis...");

  const prompt = `
    Analyze the object in this image. Your response must be a valid JSON object.
    1. Identify the primary waste item.
    2. Provide brief, practical guidance on how to properly dispose of or recycle it.
    3. Create a multiple-choice quiz question related to the disposal of this item.
    
    The JSON object must follow this exact structure:
    {
      "guidance": "string",
      "quiz": {
        "question": "string",
        "options": ["string", "string", "string"],
        "correctAnswer": "string"
      }
    }
  `;

  try {
    const imagePart = fileToGenerativePart(imageDataUrl);
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    
    console.log("Gemini API response text:", text);
    
    // Clean the text to ensure it's valid JSON
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedJson = JSON.parse(cleanedText);

    // Validate the parsed JSON
    if (parsedJson.guidance && parsedJson.quiz && parsedJson.quiz.question) {
      return parsedJson as GeminiResponse;
    } else {
      throw new Error("Invalid JSON structure from Gemini API");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get guidance from Gemini.");
  }
};
