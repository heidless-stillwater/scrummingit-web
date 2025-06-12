'use server';

/**
 * @fileOverview AI-driven design suggestion tool.
 *
 * - getDesignSuggestions - A function that provides design suggestions based on portfolio samples.
 * - GetDesignSuggestionsInput - The input type for the getDesignSuggestions function.
 * - GetDesignSuggestionsOutput - The return type for the getDesignSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetDesignSuggestionsInputSchema = z.object({
  portfolioSamples: z
    .string()
    .describe('Examples of existing portfolio designs, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'),
  designPreferences: z.string().describe('Specific design preferences or requirements.'),
});

export type GetDesignSuggestionsInput = z.infer<
  typeof GetDesignSuggestionsInputSchema
>;

const GetDesignSuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('AI-generated design suggestions based on the portfolio samples and design preferences.'),
});

export type GetDesignSuggestionsOutput = z.infer<
  typeof GetDesignSuggestionsOutputSchema
>;

export async function getDesignSuggestions(
  input: GetDesignSuggestionsInput
): Promise<GetDesignSuggestionsOutput> {
  return getDesignSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getDesignSuggestionsPrompt',
  input: {schema: GetDesignSuggestionsInputSchema},
  output: {schema: GetDesignSuggestionsOutputSchema},
  prompt: `You are an AI design assistant providing design suggestions for web design agency websites.

  Based on the provided portfolio samples and design preferences, generate design suggestions to improve the website's design and aesthetics.

  Portfolio Samples: {{media url=portfolioSamples}}
  Design Preferences: {{{designPreferences}}}

  Suggestions:
  `,
});

const getDesignSuggestionsFlow = ai.defineFlow(
  {
    name: 'getDesignSuggestionsFlow',
    inputSchema: GetDesignSuggestionsInputSchema,
    outputSchema: GetDesignSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
