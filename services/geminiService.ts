
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this example, we will proceed, and the API call will fail if the key is missing.
  console.warn("Gemini API key not found in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generatePodManifest = async (description: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a valid Kubernetes Pod YAML manifest for the following request: "${description}". Only output the YAML content itself, without any introductory text, explanation, or markdown code block fences.`,
      config: {
        // We expect a code-like response, so a lower temperature can be better.
        temperature: 0.2, 
      }
    });

    // The response.text should contain just the YAML.
    const yamlText = response.text;

    // A simple check to see if the response looks like YAML
    if (yamlText.trim().startsWith('apiVersion:')) {
        return yamlText.trim();
    } else {
        // Fallback or error if the response is not as expected
        throw new Error("Generated content does not appear to be a valid YAML manifest.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate Kubernetes manifest from Gemini API.");
  }
};
