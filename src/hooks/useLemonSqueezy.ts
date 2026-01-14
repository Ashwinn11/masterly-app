'use client';

import { useState } from 'react';

interface CheckoutOptions {
    variantId: string;
    customData?: Record<string, any>;
}

export function useLemonSqueezy() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createCheckout = async (options: CheckoutOptions) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/lemonsqueezy/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(options),
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Server returned non-JSON response:', text.slice(0, 200));
                throw new Error(`Server error (${response.status}): Expected JSON but got HTML. Check your API route or auth status.`);
            }

            const data = await response.json();

            if (!response.ok) {
                console.error('Checkout error response:', data);
                throw new Error(data.message || data.error || 'Failed to create checkout');
            }

            const { checkoutUrl } = data;

            // Redirect to checkout
            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            }

            return checkoutUrl;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProducts = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/lemonsqueezy/products');

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const { products } = await response.json();
            return products;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const getPortalUrl = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/lemonsqueezy/portal');

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to fetch portal URL');
            }

            const { portalUrl } = await response.json();

            if (portalUrl) {
                window.location.href = portalUrl;
            }

            return portalUrl;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const cancelSubscription = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/lemonsqueezy/cancel', {
                method: 'POST',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to cancel subscription');
            }

            return data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const resumeSubscription = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/lemonsqueezy/resume', {
                method: 'POST',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to resume subscription');
            }

            return data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const updatePlan = async (variantId: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/lemonsqueezy/update-plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ variantId }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update plan');
            }

            return data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        createCheckout,
        fetchProducts,
        getPortalUrl,
        cancelSubscription,
        resumeSubscription,
        updatePlan,
        isLoading,
        error,
    };
}
