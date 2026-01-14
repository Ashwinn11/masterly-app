'use client';

import { useState, useEffect } from 'react';
import { useLemonSqueezy } from '@/hooks/useLemonSqueezy';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  interval: string;
  variantId: string;
  features: string[];
  popular?: boolean;
}

// Masterly pricing tiers with actual Lemon Squeezy variant IDs
const pricingTiers: PricingTier[] = [
  {
    id: 'weekly',
    name: 'Weekly',
    description: 'Perfect for short-term goals',
    price: '$7.99',
    interval: 'week',
    variantId: '1138639',
    features: [
      'Unlimited flashcards',
      'AI-powered study suggestions',
      'Advanced analytics',
      'Mobile app access',
      'Custom themes',
      'Export/Import cards',
    ],
  },
  {
    id: 'monthly',
    name: 'Monthly',
    description: 'Most popular choice',
    price: '$12.99',
    interval: 'month',
    variantId: '1138644',
    features: [
      'Unlimited flashcards',
      'AI-powered study suggestions',
      'Advanced analytics',
      'Priority support',
      'Custom themes',
      'Export/Import cards',
      'Early access to new features',
    ],
    popular: true,
  },
  {
    id: 'yearly',
    name: 'Yearly',
    description: 'Best value - Save 48%',
    price: '$79.99',
    interval: 'year',
    variantId: '1138642',
    features: [
      'Everything in Monthly',
      'Save $76.89 per year',
      'Lifetime updates',
      'Premium support',
      'Priority feature requests',
      'Exclusive community access',
    ],
  },
];

export function PricingSection() {
  const { createCheckout, isLoading } = useLemonSqueezy();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [discountCode, setDiscountCode] = useState('');

  const handleSubscribe = async (tier: PricingTier) => {
    if (!tier.variantId) {
      // Handle free tier or show error
      return;
    }

    setSelectedTier(tier.id);

    try {
      await createCheckout({
        variantId: tier.variantId,
        customData: {
          tier: tier.id,
          discount_code: discountCode || undefined,
        },
      });
    } catch (error) {
      console.error('Checkout error:', error);
      setSelectedTier(null);
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-xl text-muted-foreground">
            Start learning smarter today
          </p>
          
          {/* Discount Code Input */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Have a discount code?"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {discountCode && (
                <button
                  onClick={() => setDiscountCode('')}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
            {discountCode && (
              <p className="text-sm text-primary mt-2">
                ✓ Discount code "{discountCode}" will be applied at checkout
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.id}
              className={`relative ${
                tier.popular
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-border'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.interval && (
                    <span className="text-muted-foreground ml-2">
                      / {tier.interval}
                    </span>
                  )}
                </div>

                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={tier.popular ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(tier)}
                  disabled={isLoading && selectedTier === tier.id}
                >
                  {isLoading && selectedTier === tier.id
                    ? 'Loading...'
                    : tier.id === 'free'
                    ? 'Get Started'
                    : 'Subscribe Now'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
