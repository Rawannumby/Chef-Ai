// src/ai/flows/generate-recipe-from-ingredients.ts
'use server';
/**
 * @fileOverview Generates a recipe based on a list of ingredients and dietary preferences.
 *
 * - generateRecipeFromIngredients - A function that handles the recipe generation process.
 * - GenerateRecipeFromIngredientsInput - The input type for the generateRecipeFromIngredients function.
 * - GenerateRecipeFromIngredientsOutput - The return type for the generateRecipeFromIngredients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeFromIngredientsInputSchema = z.object({
  ingredients: z.array(z.string()).describe('A list of ingredients available to use in the recipe.'),
  vegetarian: z.boolean().optional().describe('Whether the recipe should be vegetarian.'),
  vegan: z.boolean().optional().describe('Whether the recipe should be vegan.'),
  glutenFree: z.boolean().optional().describe('Whether the recipe should be gluten-free.'),
  highProtein: z.boolean().optional().describe('Whether the recipe should be high in protein.'),
});
export type GenerateRecipeFromIngredientsInput = z.infer<typeof GenerateRecipeFromIngredientsInputSchema>;

const GenerateRecipeFromIngredientsOutputSchema = z.object({
  recipeName: z.string().describe('The name of the generated recipe.'),
  steps: z.array(z.string()).describe('A list of steps to prepare the recipe.'),
  requiredIngredients: z.array(z.string()).describe('A list of ingredients required for the recipe.'),
  alternativeSuggestions: z.array(z.string()).describe('A list of alternative suggestions for the recipe.'),
});
export type GenerateRecipeFromIngredientsOutput = z.infer<typeof GenerateRecipeFromIngredientsOutputSchema>;

export async function generateRecipeFromIngredients(input: GenerateRecipeFromIngredientsInput): Promise<GenerateRecipeFromIngredientsOutput> {
  return generateRecipeFromIngredientsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipeFromIngredientsPrompt',
  input: {schema: GenerateRecipeFromIngredientsInputSchema},
  output: {schema: GenerateRecipeFromIngredientsOutputSchema},
  prompt: `You are a world-class chef specializing in creating recipes based on available ingredients and dietary preferences.

  Generate a recipe based on the following ingredients:
  {{#each ingredients}}
  - {{{this}}}
  {{/each}}

  Dietary Preferences:
  {{#if vegetarian}}
  - Vegetarian
  {{/if}}
  {{#if vegan}}
  - Vegan
  {{/if}}
  {{#if glutenFree}}
  - Gluten-Free
  {{/if}}
  {{#if highProtein}}
  - High Protein
  {{/if}}

  Provide the recipe name, a list of steps to prepare the recipe, a list of required ingredients, and alternative suggestions.
  Ensure the response is a valid JSON.
  `, 
});

const generateRecipeFromIngredientsFlow = ai.defineFlow(
  {
    name: 'generateRecipeFromIngredientsFlow',
    inputSchema: GenerateRecipeFromIngredientsInputSchema,
    outputSchema: GenerateRecipeFromIngredientsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
