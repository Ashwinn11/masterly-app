'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Calendar, ShieldCheck, ArrowUpCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLemonSqueezy } from '@/hooks/useLemonSqueezy';
import { useConfirmationStore } from '@/lib/utils/confirmationUtils';
import { cn } from '@/lib/utils';

interface ManageSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: any;
  onUpdate?: () => void;
}

export function ManageSubscriptionModal({ isOpen, onClose, subscription, onUpdate }: ManageSubscriptionModalProps) {
  const { getPortalUrl, cancelSubscription, isLoading } = useLemonSqueezy();
  const { openConfirmation } = useConfirmationStore();
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !subscription) return null;

  const planName = 
    subscription.variant_id === process.env.NEXT_PUBLIC_LS_VARIANT_WEEKLY ? 'Weekly Pro' :
    subscription.variant_id === process.env.NEXT_PUBLIC_LS_VARIANT_MONTHLY ? 'Monthly Pro' :
    subscription.variant_id === process.env.NEXT_PUBLIC_LS_VARIANT_YEARLY ? 'Yearly Pro' : 'Masterly Pro';

  const planPrice = 
    subscription.variant_id === process.env.NEXT_PUBLIC_LS_VARIANT_WEEKLY ? '$4.99' :
    subscription.variant_id === process.env.NEXT_PUBLIC_LS_VARIANT_MONTHLY ? '$9.99' :
    subscription.variant_id === process.env.NEXT_PUBLIC_LS_VARIANT_YEARLY ? '$99' : '---';

  const billingPeriod = 
    subscription.variant_id === process.env.NEXT_PUBLIC_LS_VARIANT_WEEKLY ? 'week' :
    subscription.variant_id === process.env.NEXT_PUBLIC_LS_VARIANT_MONTHLY ? 'month' :
    subscription.variant_id === process.env.NEXT_PUBLIC_LS_VARIANT_YEARLY ? 'year' : 'period';

  const handleCancelClick = () => {
    openConfirmation({
      title: 'Cancel Subscription?',
      message: 'You will keep your Pro features until the end of your current billing period. After that, you will be moved to the free plan.',
      variant: 'danger',
      onConfirm: async () => {
        try {
          await cancelSubscription();
          if (onUpdate) onUpdate();
          onClose();
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-10 w-full max-w-lg bg-card border-4 border-foreground rounded-[2.5rem] shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b-4 border-foreground bg-primary/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h2 className="font-handwritten text-2xl font-black">Manage Subscription</h2>
              <p className="font-handwritten text-sm opacity-70">View and update your Pro status</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full border-2 border-foreground flex items-center justify-center hover:bg-muted transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-500 rounded-xl flex items-start gap-3 text-red-700">
              <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
              <p className="font-handwritten text-sm font-bold">{error}</p>
            </div>
          )}

          {/* Current Plan Card */}
          <div className="p-6 bg-muted/30 border-2 border-foreground/10 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">Current Plan</span>
                <h3 className="font-handwritten text-3xl font-black text-primary">{planName}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">Price</span>
                <p className="font-handwritten text-2xl font-black">{planPrice}<span className="text-sm opacity-50">/{billingPeriod}</span></p>
              </div>
            </div>
            
            <div className="space-y-3 pt-4 border-t-2 border-foreground/5 font-handwritten">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-bold">Status:</span>
                <span className={cn(
                  "px-2 py-0.5 text-white text-[10px] uppercase font-black rounded-full",
                  subscription.status === 'active' ? "bg-green-500" : "bg-orange-500"
                )}>
                  {subscription.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="w-4 h-4 text-primary" />
                <span className="font-bold">
                  {subscription.status === 'cancelled' ? 'Expires on:' : 'Renews on:'}
                </span>
                <span>{new Date(subscription.ends_at || subscription.renews_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 gap-3">
            <Button 
              onClick={async () => {
                // For upgrades, the LS Portal is the BEST way because it handles
                // proration (refunding the unused time of the old plan) automatically.
                try {
                  await getPortalUrl();
                } catch (err: any) {
                  setError('Failed to open upgrade portal');
                }
              }}
              disabled={isLoading}
              variant="default"
              className="h-14 font-handwritten text-lg font-black bg-gradient-to-r from-primary to-accent border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex gap-2"
            >
              <ArrowUpCircle className="w-5 h-5" />
              Upgrade or Change Plan
            </Button>

            <Button 
              onClick={handleUpdatePayment}
              disabled={isLoading}
              variant="outline"
              className="h-14 font-handwritten text-lg font-black border-4 border-foreground flex gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Update Payment Method
            </Button>

            {subscription.status !== 'cancelled' && (
              <Button 
                onClick={handleCancelClick}
                disabled={isLoading}
                variant="ghost"
                className="h-14 font-handwritten text-lg font-black text-red-500 hover:bg-red-50 hover:text-red-600 flex gap-2"
              >
                <XCircle className="w-5 h-5" />
                Cancel Subscription
              </Button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-muted/30 border-t-4 border-foreground text-center">
          <p className="font-handwritten text-sm opacity-60">
            For more help, contact support@masterly.in
          </p>
        </div>
      </motion.div>
    </div>
  );
}
