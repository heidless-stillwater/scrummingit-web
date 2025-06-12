'use server';

/**
 * @fileOverview Generates website copy for a web design agency.
 *
 * - generateWebsiteCopy - A function that generates website copy.
 * - GenerateWebsiteCopyInput - The input type for the generateWebsiteCopy function.
 * - GenerateWebsiteCopyOutput - The return type for the generateWebsiteCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWebsiteCopyInputSchema = z.object({
  agencyName: z.string().describe('The name of the web design agency.'),
  agencyDescription: z.string().describe('A brief description of the agency.'),
  targetAudience: z.string().describe('The target audience for the agency website.'),
  websitePurpose: z.string().describe('The primary purpose of the website (e.g., showcasing portfolio, attracting clients).'),
});
export type GenerateWebsiteCopyInput = z.infer<typeof GenerateWebsiteCopyInputSchema>;

const GenerateWebsiteCopyOutputSchema = z.object({
  headline: z.string().describe('A catchy headline for the website.'),
  aboutUsSection: z.string().describe('An engaging "About Us" section.'),
  portfolioSection: z.string().describe('A description for the portfolio section.'),
  contactUsSection: z.string().describe('A call to action for the "Contact Us" section.'),
});
export type GenerateWebsiteCopyOutput = z.infer<typeof GenerateWebsiteCopyOutputSchema>;

export async function generateWebsiteCopy(input: GenerateWebsiteCopyInput): Promise<GenerateWebsiteCopyOutput> {
  return generateWebsiteCopyFlow(input);
}

const generateWebsiteCopyPrompt = ai.definePrompt({
  name: 'generateWebsiteCopyPrompt',
  input: {schema: GenerateWebsiteCopyInputSchema},
  output: {schema: GenerateWebsiteCopyOutputSchema},
  prompt: `You are an expert copywriter specializing in creating website content for web design agencies.

  Based on the information provided, generate compelling and engaging website copy that aligns with the agency's brand and goals.

  Agency Name: {{{agencyName}}}
  Agency Description: {{{agencyDescription}}}
  Target Audience: {{{targetAudience}}}
  Website Purpose: {{{websitePurpose}}}

  Here's the website copy:
  Headline: {{headline}}
  About Us Section: {{aboutUsSection}}
  Portfolio Section: {{portfolioSection}}
  Contact Us Section: {{contactUsSection}}`,
});

const generateWebsiteCopyFlow = ai.defineFlow(
  {
    name: 'generateWebsiteCopyFlow',
    inputSchema: GenerateWebsiteCopyInputSchema,
    outputSchema: GenerateWebsiteCopyOutputSchema,
  },
  async input => {
    const {output} = await generateWebsiteCopyPrompt(input);
    return output!;
  }
);
