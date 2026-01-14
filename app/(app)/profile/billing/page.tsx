'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CreditCard, 
  Calendar, 
  ShieldCheck, 
  ArrowUpCircle, 
  XCircle, 
  AlertTriangle,
  ArrowLeft,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLemonSqueezy } from '@/hooks/useLemonSqueezy';
import { useConfirmationStore } from '@/lib/utils/confirmationUtils';
import { useAuth } from '@/hooks/useAuth';
import { getSupabaseClient } from '@/lib/supabase/client';
import { ScreenLayout } from '@/components/ui/ScreenLayout';
import { Paywall } from '@/components/Paywall';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function BillingPage() {
  const router = useRouter();
  const { user } = useAuth() as any;
  const { getPortalUrl, cancelSubscription, resumeSubscription, isLoading: isLSLoading, fetchProducts } = useLemonSqueezy();
  const { openConfirmation } = useConfirmationStore();
  
  const [subscription, setSubscription] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]); // Added products state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    async function fetchProductsData() {
        if (fetchProducts) {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                console.error("Failed to load products", err);
            }
        }
    }
    fetchProductsData();
  }, []);

  useEffect(() => {
    async function fetchSubscription() {
      if (!user?.id) return;
      
      try {
        const supabase = getSupabaseClient();
        const now = new Date().toISOString();
        const { data, error: subError } = await (supabase as any)
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .or(`status.in.(active,on_trial,past_due,paused),and(status.eq.cancelled,ends_at.gt.${now})`)
          .order('created_at', { ascending: false })
          .maybeSingle();

        if (subError) throw subError;
        setSubscription(data);
      } catch (err: any) {
        console.error('Error fetching subscription:', err);
        setError('Failed to load subscription details');
      } finally {
        setIsLoading(false);
      }
    }

    fetchSubscription();
  }, [user?.id]);

  const handleCancelClick = () => {
    openConfirmation({
      title: 'Cancel Subscription?',
      message: 'You will keep your Pro features until the end of your current billing period. After that, you will be moved to the free plan.',
      variant: 'danger',
      onConfirm: async () => {
        try {
          await cancelSubscription();
          // Update local state
          setSubscription((prev: any) => ({
            ...prev,
            status: 'cancelled',
            ends_at: prev.renews_at
          }));
        } catch (err: any) {
          setError(err.message || 'Failed to cancel subscription');
        }
      }
    });
  };

  const handleUpdatePayment = async () => {
    try {
      await getPortalUrl();
    } catch (err: any) {
      setError(err.message || 'Failed to open billing portal');
    }
  };

  const handleUpgrade = async () => {
    try {
      await getPortalUrl();
    } catch (err: any) {
      setError(err.message || "Failed to open billing portal");
    }
  };


  if (showPaywall) {
    return (
      <ScreenLayout>
        <Paywall 
          onClose={async () => {
            setShowPaywall(false);
            // Refetch subscription to show updated plan
            const supabase = getSupabaseClient();
            const now = new Date().toISOString();
            const { data } = await (supabase as any)
              .from('subscriptions')
              .select('*')
              .eq('user_id', user.id)
              .or(`status.in.(active,on_trial,past_due,paused),and(status.eq.cancelled,ends_at.gt.${now})`)
              .order('created_at', { ascending: false })
              .maybeSingle();
            
            if (data) {
              setSubscription(data);
            }
          }}
          showCloseButton={true}
          currentVariantId={subscription?.variant_id}
          currentSubscription={subscription}
          title="Upgrade Your Plan"
          subtitle="Choose a new plan to continue your Pro journey"
        />
      </ScreenLayout>
    );
  }

  if (isLoading) {
    return (
      <ScreenLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="mt-4 font-handwritten text-xl font-black">Loading billing details...</p>
        </div>
      </ScreenLayout>
    );
  }

  if (!subscription) {
    return (
      <ScreenLayout>
        <div className="max-w-2xl mx-auto py-12 px-4">
          <Link 
            href="/profile" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 font-handwritten font-black"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Profile
          </Link>
          <div className="text-center space-y-6 p-12 bg-card border-4 border-foreground rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)]">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="font-handwritten text-4xl font-black">No Active Subscription</h1>
            <p className="font-handwritten text-xl opacity-70">You are currently on the free plan.</p>
            <Button 
              onClick={() => router.push('/profile')}
              className="px-8 py-6 text-xl font-black rounded-2xl border-[3px] border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Go Pro Now
            </Button>
          </div>
        </div>
      </ScreenLayout>
    );
  }

  const planName = 
    subscription.variant_id === process.env.NEXT_PUBLIC_LS_VARIANT_WEEKLY ? 'Weekly Pro' :
    subscription.variant_id === process.env.NEXT_PUBLIC_LS_VARIANT_MONTHLY ? 'Monthly Pro' :
    subscription.variant_id === process.env.NEXT_PUBLIC_LS_VARIANT_YEARLY ? 'Yearly Pro' : 'Masterly Pro';


  const currentProduct = products.find(p => 
    p.relationships?.variants?.data?.some((v: any) => v.id === subscription?.variant_id)
  );
  
  const planPrice = currentProduct?.attributes?.price_formatted || '---';

  const billingPeriod = 
    subscription.variant_id === process.env.NEXT_PUBLIC_LS_VARIANT_WEEKLY ? 'week' :
    subscription.variant_id === process.env.NEXT_PUBLIC_LS_VARIANT_MONTHLY ? 'month' :
    subscription.variant_id === process.env.NEXT_PUBLIC_LS_VARIANT_YEARLY ? 'year' : 'period';

  return (
    <ScreenLayout>
      <div className="max-w-3xl mx-auto py-8 px-4">
        <Link 
          href="/profile" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 font-handwritten font-black group transition-all"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1" /> Back to Profile
        </Link>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-xl flex items-start gap-3 text-red-700">
            <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
            <p className="font-handwritten text-sm font-bold">{error}</p>
          </div>
        )}

        <div className="bg-card border-4 border-foreground rounded-[2.5rem] shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b-4 border-foreground bg-primary/5 flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <div>
              <h1 className="font-handwritten text-4xl font-black">Plan & Billing</h1>
              <p className="font-handwritten text-lg opacity-70">Manage your subscription and payments</p>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Current Plan Card */}
            <div className="p-8 bg-muted/20 border-4 border-foreground rounded-[2rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <CheckCircle2 className="w-24 h-24" />
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative z-10">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-muted-foreground bg-white/50 px-3 py-1 rounded-full border border-foreground/10">Active Subscription</span>
                  <h2 className="font-handwritten text-5xl font-black text-primary mt-2">{planName}</h2>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "px-3 py-1 text-white text-xs uppercase font-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                        subscription.status === 'active' ? "bg-green-500" : "bg-orange-500"
                      )}>
                        {subscription.status}
                      </span>
                    </div>
                    <p className="font-handwritten text-xl font-black opacity-60">
                      {planPrice}<span className="text-sm">/{billingPeriod}</span>
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-auto p-4 bg-white/50 border-2 border-foreground/5 rounded-2xl font-handwritten space-y-2">
                  <div className="flex items-center gap-2 text-sm justify-between md:justify-start">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-bold whitespace-nowrap">
                      {subscription.status === 'cancelled' ? 'Expires on:' : 'Renews on:'}
                    </span>
                    <span className="font-black">{new Date(subscription.ends_at || subscription.renews_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm justify-between md:justify-start">
                    <CreditCard className="w-4 h-4 text-primary" />
                    <span className="font-bold whitespace-nowrap">Method:</span>
                    <span className="font-black">Safe via Checkout</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subscription.status === 'cancelled' ? (
                <Button 
                  onClick={async () => {
                    try {
                      await resumeSubscription();
                      // Refetch the subscription to get the updated renews_at date
                      const supabase = getSupabaseClient();
                      const now = new Date().toISOString();
                      const { data } = await (supabase as any)
                        .from('subscriptions')
                        .select('*')
                        .eq('user_id', user.id)
                        .or(`status.in.(active,on_trial,past_due,paused),and(status.eq.cancelled,ends_at.gt.${now})`)
                        .order('created_at', { ascending: false })
                        .maybeSingle();
                      
                      if (data) {
                        setSubscription(data);
                      }
                    } catch (err: any) {
                      setError(err.message || 'Failed to resume subscription');
                    }
                  }}
                  disabled={isLSLoading}
                  className="h-20 font-handwritten text-xl font-black bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 border-4 border-green-700 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex gap-3"
                >
                  <CheckCircle2 className="w-7 h-7" />
                  Resume Subscription
                </Button>
              ) : (
                <Button 
                  onClick={handleUpgrade}
                  disabled={isLSLoading}
                  className="h-20 font-handwritten text-xl font-black bg-gradient-to-r from-primary to-accent border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex gap-3"
                >
                  <ArrowUpCircle className="w-7 h-7" />
                  Upgrade or Change Plan
                </Button>
              )}

              <Button 
                onClick={handleUpdatePayment}
                disabled={isLSLoading}
                variant="outline"
                className="h-20 font-handwritten text-xl font-black border-4 border-foreground flex gap-3 bg-white"
              >
                <CreditCard className="w-7 h-7" />
                Update Payment Method
              </Button>
            </div>

            {/* Cancel Zone - Only show for active subscriptions */}
            {subscription.status !== 'cancelled' && (
              <div className="pt-6 border-t-4 border-dashed border-foreground/10">
                <Button 
                  onClick={handleCancelClick}
                  disabled={isLSLoading}
                  variant="ghost"
                  className="w-full h-16 font-handwritten text-lg font-black text-red-500 hover:bg-red-50 hover:text-red-600 border-2 border-transparent hover:border-red-200 transition-all flex gap-2"
                >
                  <XCircle className="w-6 h-6" />
                  Cancel Subscription
                </Button>
                <p className="mt-2 text-center text-xs font-handwritten opacity-50">
                  You will keep your Pro features until the current period ends.
                </p>
              </div>
            )}
          </div>

          {/* Footer Card */}
          <div className="p-8 bg-muted/40 border-t-4 border-foreground">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="font-handwritten text-lg font-bold opacity-60">
                Need manual help or a refund?
              </p>
              <Link 
                href="mailto:support@masterlyapp.in"
                className="px-6 py-3 bg-white border-2 border-foreground rounded-xl font-handwritten font-black hover:bg-muted transition-colors text-sm"
              >
                support@masterlyapp.in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
}
