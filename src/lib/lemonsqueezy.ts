import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';

/**
 * Initialize Lemon Squeezy API client
 * This should be called before making any API requests
 */
export function configureLemonSqueezy() {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  
  if (!apiKey) {
    throw new Error('LEMONSQUEEZY_API_KEY is not set');
  }

  lemonSqueezySetup({
    apiKey,
    onError: (error) => {
      console.error('Lemon Squeezy API Error:', error);
      throw error;
    },
  });
}

/**
 * Get the store ID from environment variables
 */
export function getStoreId(): string {
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  
  if (!storeId) {
    throw new Error('LEMONSQUEEZY_STORE_ID is not set');
  }
  
  return storeId;
}

/**
 * Get the webhook secret from environment variables
 */
export function getWebhookSecret(): string {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  
  if (!secret) {
    throw new Error('LEMONSQUEEZY_WEBHOOK_SECRET is not set');
  }
  
  return secret;
}
