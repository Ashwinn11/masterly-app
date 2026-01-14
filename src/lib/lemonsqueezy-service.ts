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
        checkoutOptions: {
            embed: false,
            media: true,
            logo: true,
        },
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
    configureLemonSqueezy();

    const subscription = await getSubscription(subscriptionId);

    return subscription.data?.data;
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
