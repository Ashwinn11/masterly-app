import {
    createCheckout,
    getProduct,
    listProducts,
    getSubscription,
    cancelSubscription,
    updateSubscription,
    type Checkout,
    type Product,
    type Subscription
} from '@lemonsqueezy/lemonsqueezy.js';
import { configureLemonSqueezy, getStoreId } from './lemonsqueezy';

/**
 * Create a checkout session for a product
 */
export async function createCheckoutSession(
    variantId: string,
    userId: string,
    userEmail: string,
    customData?: Record<string, any>
) {
    configureLemonSqueezy();

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const redirectUrl = `${baseUrl}/dashboard?billing_success=true`;
    const isTestMode = process.env.NODE_ENV !== 'production';

    // Extract discount_code if present
    const { discount_code, ...restCustomData } = customData || {};

    const checkout = await createCheckout(getStoreId(), variantId, {
        checkoutData: {
            email: userEmail,
            discountCode: discount_code,
            custom: {
                user_id: userId,
                ...restCustomData,
            },
        },
        productOptions: {
            redirectUrl: redirectUrl,
        },
        checkoutOptions: {
            embed: false,
            media: true,
            logo: true,
        },
        testMode: isTestMode,
    });

    return checkout.data?.data.attributes.url;
}

/**
 * Get all products from the store
 */
export async function getProducts() {
    configureLemonSqueezy();

    const products = await listProducts({
        filter: { storeId: getStoreId() },
        include: ['variants'],
    });

    return products.data?.data || [];
}

/**
 * Get a single product by ID
 */
export async function getProductById(productId: string) {
    configureLemonSqueezy();

    const product = await getProduct(productId, {
        include: ['variants'],
    });

    return product.data?.data;
}

/**
 * Get subscription details
 */
export async function getSubscriptionDetails(subscriptionId: string) {
    if (!subscriptionId) {
        console.error('[LS] getSubscriptionDetails: No subscriptionId provided');
        return null;
    }

    const storeId = getStoreId();
    console.log(`[LS] Fetching subscription details for ID: ${subscriptionId} (Store ID: ${storeId})`);
    configureLemonSqueezy();

    try {
        // Try as provided (usually string)
        const subscription = await getSubscription(subscriptionId);
        return subscription.data?.data;
    } catch (error: any) {
        // If it failed, try as a number just in case
        if (!isNaN(Number(subscriptionId))) {
            try {
                const subscription = await getSubscription(Number(subscriptionId));
                return subscription.data?.data;
            } catch (innerError) {
                // Ignore and fall through to original error
            }
        }

        console.error(`[LS] Error fetching subscription ${subscriptionId}:`, error);
        if (error.response?.status === 404 || error.message?.includes('Not Found')) {
            console.error(`[LS] Subscription ${subscriptionId} not found in Lemon Squeezy Store ${storeId}. Check if this is a Test vs Live ID mismatch or if the API key belongs to a different store.`);
        }
        throw error;
    }
}

/**
 * Cancel a subscription
 */
export async function cancelUserSubscription(subscriptionId: string) {
    configureLemonSqueezy();

    const result = await cancelSubscription(subscriptionId);

    return result.data?.data;
}

/**
 * Update a subscription (e.g., change plan)
 */
export async function updateUserSubscription(
    subscriptionId: string,
    variantId: string
) {
    configureLemonSqueezy();

    const result = await updateSubscription(subscriptionId, {
        variantId: parseInt(variantId),
    });

    return result.data?.data;
}

/**
 * Check if a subscription is active
 */
export function isSubscriptionActive(subscription: any): boolean {
    if (!subscription) return false;

    const status = subscription.attributes?.status;
    return status === 'active' || status === 'on_trial';
}
