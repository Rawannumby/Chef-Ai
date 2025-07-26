'use server';
/**
 * @fileOverview Identifies ingredients from an image.
 *
 * - identifyIngredientsFromImage - A function that handles the ingredient identification process.
 * - IdentifyIngredientsFromImageInput - The input type for the identifyIngredientsFromImage function.
 * - IdentifyIngredientsFromImageOutput - The return type for the identifyIngredientsFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyIngredientsFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of ingredients, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyIngredientsFromImageInput = z.infer<typeof IdentifyIngredientsFromImageInputSchema>;

const IdentifyIngredientsFromImageOutputSchema = z.object({
    ingredients: z.array(z.string()).describe('A list of identified ingredients.'),
});
export type IdentifyIngredientsFromImageOutput = z.infer<typeof IdentifyIngredientsFromImageOutputSchema>;


export async function identifyIngredientsFromImage(input: IdentifyIngredientsFromImageInput): Promise<IdentifyIngredientsFromImageOutput> {
    return identifyIngredientsFromImageFlow(input);
}

const prompt = ai.definePrompt({
    name: 'identifyIngredientsFromImagePrompt',
    input: { schema: IdentifyIngredientsFromImageInputSchema },
    output: { schema: IdentifyIngredientsFromImageOutputSchema },
    prompt: `You are an expert at identifying food ingredients from an image. 
    
    Based on the provided image, identify the food ingredients present. 
    Return only the names of the ingredients.
    
    Image: {{media url=photoDataUri}}
    `,
});


const identifyIngredientsFromImageFlow = ai.defineFlow(
    {
        name: 'identifyIngredientsFromImageFlow',
        inputSchema: IdentifyIngredientsFromImageInputSchema,
        outputSchema: IdentifyIngredientsFromImageOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
