// src/ai/flows/personalized-loteria-boards.ts
'use server';

/**
 * @fileOverview A flow to generate a personalized Lotería board based on image features.
 *
 * - generatePersonalizedBoard - A function that generates a personalized Lotería board.
 * - GeneratePersonalizedBoardInput - The input type for the generatePersonalizedBoard function.
 * - GeneratePersonalizedBoardOutput - The return type for the generatePersonalizedBoard function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedBoardInputSchema = z.object({
  imageFeature: z
    .string()
    .describe(
      'The image feature to base the Lotería board on (e.g., people, landscapes, or artifacts).'
    ),
});
export type GeneratePersonalizedBoardInput = z.infer<
  typeof GeneratePersonalizedBoardInputSchema
>;

const GeneratePersonalizedBoardOutputSchema = z.object({
  boardDataUri: z
    .string()
    .describe(
      'A data URI containing the generated Lotería board image, using base64 encoding.'
    ),
});
export type GeneratePersonalizedBoardOutput = z.infer<
  typeof GeneratePersonalizedBoardOutputSchema
>;

export async function generatePersonalizedBoard(
  input: GeneratePersonalizedBoardInput
): Promise<GeneratePersonalizedBoardOutput> {
  return generatePersonalizedBoardFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedBoardPrompt',
  input: {schema: GeneratePersonalizedBoardInputSchema},
  output: {schema: GeneratePersonalizedBoardOutputSchema},
  prompt: `You are a Lotería board designer who can generate visually appealing and unique Lotería boards based on a specific theme.

  The user is requesting a board based on the following image features: {{{imageFeature}}}.

  Create a 4x4 Lotería board with images related to the specified theme. The board should have a light tan background (#F2E4D7) and vibrant orange (#FF9500) borders. Use turquoise (#40E0D0) to highlight interactive elements.

  Ensure that the card placement is automatically changed to produce diverse board styles.

  Return the generated board as a data URI in base64 format.  Expected format: 'data:<mimetype>;base64,<encoded_data>'.`,
});

const generatePersonalizedBoardFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedBoardFlow',
    inputSchema: GeneratePersonalizedBoardInputSchema,
    outputSchema: GeneratePersonalizedBoardOutputSchema,
  },
  async input => {
    const {text} = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.5-flash',
      config: {
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_ONLY_HIGH',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_LOW_AND_ABOVE',
          },
        ],
      },
    });

    return {
      boardDataUri: text!,
    };
  }
);
