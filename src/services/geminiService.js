import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

export const generateBrewRecipe = async (apiKey, formData) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const grinderName = formData.grinderBrand === 'Other (Manual)'
    ? formData.customGrinder
    : `${formData.grinderBrand} ${formData.grinderModel}`;

  const prompt = `
    You are an expert World Brewers Cup champion and coffee scientist.
    Create a V60 pour-over coffee recipe based on these exact parameters:
    - Beans: ${formData.beanInfo}
    - Grinder: ${grinderName} (IMPORTANT: Give a realistic click/number setting for this specific grinder model based on typical pour-over size. If it's an OEM/rare grinder, estimate a medium-fine to medium setting).
    - Water: Cleo (TDS ~40ppm, very soft water. Requires slightly higher temp or finer grind to compensate for low extraction power).
    - Target Taste Profile: ${formData.tasteProfile}
    - Iced Coffee (Japanese style): ${formData.isIced ? 'YES' : 'NO'}

    Respond ONLY in JSON format matching exactly this schema, with NO markdown formatting around it (just the JSON object):
    {
      "grindSize": "string (e.g. '15 Clicks', 'Setting 4.5')",
      "temperature": "string (e.g. '92°C')",
      "totalTime": "string (e.g. '02:30')",
      "intervals": [
        {
          "timeRange": "string (e.g. '0:00 -> 0:45')",
          "action": "string (e.g. 'Blooming (40ml)')"
        }
      ]
    }

    Note for iced coffee: Make sure the coffee to water ratio is adjusted for the ice bypass. The final interval MUST include a note: 'Server diisi [X]g Es Batu'.
  `;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    // Clean up potential markdown formatting that Gemini sometimes adds despite instructions
    text = text.replace(/```json/gi, '').replace(/```/g, '').trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate recipe. Please check your API key and try again.");
  }
};
