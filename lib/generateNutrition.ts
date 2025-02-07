import { GoalType } from "@/app/(tabs)/goal";
import { getReferences, getUserData } from "@/database/queries";

export type MealPlan = {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string[];
  total_gains: {
    calories: string;
    protein: string;
    carbs: string;
    fats: string;
  };
};

export const generateNutrition = async () => {
  const GEMINI_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyByr0oyZorVuKJkkmxOpcdTif35WTOqTKo";

  const userData = (await getUserData()) as any;

  const bulkingMealPlanPrompt = `
    I am bulking and need a structured nutrition plan in JSON format. Here are my details:
    - Age: ${userData.age}
    - Sex: ${userData.sex}
    - Height: ${userData.height}cm
    - Weight: ${userData.weight}kg
    
    Generate a daily meal plan (summarized), ensuring sufficient calories, protein, and macros for bulking. The response must be in JSON format with the following structure:
    
    {
      "breakfast": "Description of the meal with ingredients and instructions",
      "lunch": "Description of the meal with ingredients and instructions",
      "dinner": "Description of the meal with ingredients and instructions",
      "snacks": ["List of snacks with descriptions"],
      "total_gains": {
        "calories": "Total daily calories (generate only a number)",
        "protein": "Total daily protein intake (generate only a number)",
        "carbs": "Total daily carbohydrate intake (generate only a number)",
        "fats": "Total daily fat intake (generate only a number)"
      }
    }
    
    Ensure the meals are high in protein and nutrient-dense. Keep the format clean and strictly JSON-compliant, full response from the first symbole "{" to the last one "}" should be structured in json format only so it can be parsed.
    `;

  const LossWeightMealPlanPrompt = `
    I am trying to lose weight and need a structured nutrition plan in JSON format. Here are my details:
    - Age: ${userData.age}
    - Sex: ${userData.sex}
    - Height: ${userData.height}cm
    - Weight: ${userData.weight}kg
    
    Generate a daily meal plan (summarized) with calorie deficit, balanced macros, and appetite control. The response must be in JSON format with this structure:

    {
      "breakfast": "Low-calorie meal with ingredients and preparation",
      "lunch": "High-fiber meal with ingredients and preparation",
      "dinner": "Lean protein-focused meal with ingredients and preparation",
      "snacks": ["List of low-calorie snacks with descriptions"],
      "total_gains": {
        "calories": "Total daily calories (generate only a number)",
        "protein": "Protein intake to preserve muscle (generate only a number)",
        "carbs": "Controlled carbohydrate intake (generate only a number)",
        "fats": "Healthy fat intake (generate only a number)"
      }
    }

      Keep the format clean and strictly JSON-compliant, full response from the first symbole "{" to the last one "}" should be structured in json format only so it can be parsed.
    `;

  const ref = await getReferences();

  const prompt =
    ref?.goal == GoalType.gain
      ? bulkingMealPlanPrompt
      : LossWeightMealPlanPrompt;

  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any necessary API keys or authentication headers here
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return cleanJSONResponse(data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
  }
};

function cleanJSONResponse(response: string) {
  return response.replace(/```json|```/g, "").trim();
}
