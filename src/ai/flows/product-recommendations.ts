'use server';

/**
 * @fileOverview Product recommendation AI agent.
 *
 * - getProductRecommendations - A function that handles the product recommendation process.
 * - ProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  viewingHistory: z
    .array(z.string())
    .describe('The product IDs of the products the user has viewed.'),
  cartItems: z
    .array(z.string())
    .describe('The product IDs of the products currently in the user\'s cart.'),
  topSellers: z
    .array(z.string())
    .describe('The product IDs of the top selling products.'),
  numRecommendations: z
    .number()
    .default(3)
    .describe('The number of product recommendations to return.'),
});
export type ProductRecommendationsInput = z.infer<typeof ProductRecommendationsInputSchema>;

const ProductRecommendationsOutputSchema = z.object({
  productIds: z
    .array(z.string())
    .describe('The product IDs of the recommended products.'),
});
export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

export async function getProductRecommendations(
  input: ProductRecommendationsInput
): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `You are a product recommendation expert for an online boutique.

  Based on the user's viewing history, items in their cart, and the top selling products, recommend {{numRecommendations}} related products that the user might be interested in.

  Return only the product IDs.

  Viewing History: {{viewingHistory}}
  Cart Items: {{cartItems}}
  Top Sellers: {{topSellers}}`,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
