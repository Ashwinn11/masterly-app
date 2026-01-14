'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLemonSqueezy } from '@/hooks/useLemonSqueezy';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import Link from 'next/link';

interface PaywallProps {
  onClose?: () => void;
  onSubscribe?: () => void;
  showCloseButton?: boolean;
  title?: string;
  subtitle?: string;
}

// Plan types for mapping
type PlanType = 'weekly' | 'monthly' | 'yearly';

// Get Variant IDs from environment variables
const VARIANT_IDS: Record<PlanType, string> = {
  weekly: process.env.NEXT_PUBLIC_LS_VARIANT_WEEKLY || '',
  monthly: process.env.NEXT_PUBLIC_LS_VARIANT_MONTHLY || '',
  yearly: process.env.NEXT_PUBLIC_LS_VARIANT_YEARLY || '',
};

// Map Plan types to UI-specific data
const UI_PLAN_CONFIG: Record<PlanType, { interval: string, features: string[], badge?: string, popular?: boolean }> = {
  weekly: {
    interval: 'week',
    badge: 'Short Term',
    features: [
      'Unlimited Uploads (PDF, Photo, etc.)',
      '5 AI Game Types (MCQ, Match, etc.)',
      'FSRS Daily Review Algorithm',
      'Gamified Study Experience',
      'No Daily Limits',
    ],
  },
  monthly: {
    interval: 'month',
    popular: true,
    badge: 'Best Value',
    features: [
      'Everything in Weekly',
      'Unlimited Study Decks',
      'Detailed Progress Analytics',
      'Priority AI Processing',
      'Priority Support',
    ],
  },
  yearly: {
    interval: 'year',
    badge: 'Save 48%',
    features: [
      'Everything in Monthly',
      'Early access to new games',
      'Custom Study Goals',
      'Lifetime Study History',
      'Best price guaranteed',
    ],
  },
};

export function Paywall({
  onClose,
  onSubscribe,
  showCloseButton = true,
  title = "Unlock Masterly Pro",
  subtitle = "Join 10,000+ students mastering their studies"
}: PaywallProps) {
  const { createCheckout, fetchProducts, isLoading: isActionLoading } = useLemonSqueezy();
  const [products, setProducts] = useState<any[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [discountCode] = useState('MWODUWNW');

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setIsPageLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleSubscribe = async (variantId: string) => {
    setSelectedVariantId(variantId);
    try {
      // Trigger the "subscribe intent" callback
      // This will mark onboarding as completed in the background
      onSubscribe?.();

      await createCheckout({
        variantId,
        customData: {
          discount_code: discountCode,
          source: 'paywall',
        },
      });
    } catch (error) {
      console.error('Checkout error:', error);
      setSelectedVariantId(null);
    }
  };

  if (isPageLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-24 space-y-6">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground font-medium animate-pulse"
        >
          Fetching the best deals for you...
        </motion.p>
      </div>
    );
  }

  // Display order for plan types
  const planOrder: PlanType[] = ['weekly', 'monthly', 'yearly'];
  
  // Sort and filter products based on our display order and config
  const displayProducts = planOrder
    .map(type => {
      const vId = VARIANT_IDS[type];
      if (!vId) return null;

      // Find the variant in our fetched data
      const product = products.find(p => p.relationships?.variants?.data?.some((v: any) => v.id === vId));
      if (!product) return null;

      const config = UI_PLAN_CONFIG[type];
      
      return {
        id: product.id,
        variantId: vId,
        name: product.attributes.name,
        price: product.attributes.price_formatted || (product.attributes.price / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
        discountedPrice: ((product.attributes.price * 0.75) / 100).toLocaleString('en-US', { 
          style: 'currency', 
          currency: 'USD',
          minimumFractionDigits: 2 
        }),
        interval: config.interval,
        features: config.features,
        popular: config.popular,
        badge: config.badge,
        description: product.attributes.description
      };
    })
    .filter(Boolean);

  return (
    <div className="relative w-full max-w-6xl mx-auto p-6">
      {/* Close button */}
      {showCloseButton && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <Crown className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
        
        {/* Discount badge */}
        {discountCode && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg"
          >
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-sm font-black text-white uppercase tracking-wider">
              Special Introductory Offer Applied
            </span>
          </motion.div>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8 items-start">
        {displayProducts.map((p: any) => (
          <Card
            key={p.variantId}
            className={`relative transition-all duration-300 ${
              p.popular
                ? 'border-primary shadow-xl scale-105 bg-gradient-to-b from-primary/5 to-transparent z-10'
                : 'border-border hover:border-primary/50'
            }`}
          >
            {p.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className={`px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                  p.popular
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-accent text-accent-foreground shadow-sm'
                }`}>
                  {p.badge}
                </span>
              </div>
            )}

            <CardHeader className="text-center pb-4 pt-8">
              <CardTitle className="text-2xl font-bold">{p.name}</CardTitle>
              <CardDescription className="min-h-[2.5rem] flex items-center justify-center">
                {p.popular ? "The #1 choice for students" : "Great for getting started"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-2">
                   <span className="text-sm line-through text-muted-foreground font-bold">
                     {p.price.split('/')[0]}
                   </span>
                   <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-wider">
                     25% OFF
                   </span>
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-black text-primary">{p.discountedPrice}</span>
                  <span className="text-muted-foreground font-bold">/{p.interval}</span>
                </div>
              </div>

              <ul className="space-y-3">
                {p.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full text-lg font-bold py-6 group"
                variant={p.popular ? 'default' : 'outline'}
                onClick={() => handleSubscribe(p.variantId)}
                disabled={isActionLoading}
              >
                {isActionLoading && selectedVariantId === p.variantId ? (
                  <span className="flex items-center gap-2">
                    <motion.span 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⌛
                    </motion.span>
                    Redirecting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Zap className="h-4 w-4 group-hover:scale-125 transition-transform" />
                    Go Premium
                  </span>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Trust indicators */}
      <div className="text-center space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground font-medium">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            <span>SSL Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            <span>Instant Activation</span>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
          By subscribing, you agree to our <Link href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Terms</Link> and <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Privacy Policy</Link>.
          Subscriptions renew automatically.
        </p>
      </div>
    </div>
  );
}
