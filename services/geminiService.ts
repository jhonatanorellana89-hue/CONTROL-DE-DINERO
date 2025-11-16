
import { GoogleGenAI } from "@google/genai";
import { Transaction, Category } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY for Gemini is not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateFinancialSummary = async (transactions: Transaction[], categories: Category[], month: string): Promise<string> => {
  if (!API_KEY) {
    return "Gemini API key is not configured. AI summary is unavailable.";
  }

  const prompt = `
    Analyze the following financial transactions for ${month}. Provide a concise, insightful, and friendly summary of spending habits in Spanish.
    - Highlight the top 3 spending categories.
    - Calculate the total income and total expenses.
    - Offer one or two personalized tips for financial improvement based on the data.
    - Format the output as clean markdown.

    Categories:
    ${categories.map(c => `- ${c.name} (ID: ${c.id})`).join('\n')}

    Transactions (JSON format):
    ${JSON.stringify(transactions.map(t => ({
      type: t.type,
      amount: t.amount,
      category: categories.find(c => c.id === t.categoryId)?.name || 'Uncategorized',
      description: t.description,
      date: t.date.toDate().toLocaleDateString()
    })), null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating financial summary:", error);
    return "Hubo un error al generar el resumen de IA. Por favor, inténtalo de nuevo.";
  }
};
