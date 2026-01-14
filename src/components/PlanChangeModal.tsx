'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, DollarSign, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { calculateProration, getPlanPricingFromSubscription, type ProrationResult } from '@/lib/proration';

interface PlanChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  planName: string;
  currentSubscription: any;
  newVariantId: string;
  newPlanPrice: number;
  newPlanInterval: string;
  newPlanIntervalCount: number;
}

export function PlanChangeModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  planName,
  currentSubscription,
  newVariantId,
  newPlanPrice,
  newPlanInterval,
  newPlanIntervalCount
}: PlanChangeModalProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [proration, setProration] = useState<ProrationResult | null>(null);

  useEffect(() => {
    if (isOpen && currentSubscription) {
      try {
        const currentPlan = getPlanPricingFromSubscription(currentSubscription);
        const newPlan = {
          price: newPlanPrice,
          interval: newPlanInterval as any,
          intervalCount: newPlanIntervalCount,
        };

        const result = calculateProration(
          currentPlan,
          newPlan,
          currentSubscription.renews_at || currentSubscription.ends_at
        );

        setProration(result);
      } catch (error) {
        console.error('Error calculating proration:', error);
      }
    }
  }, [isOpen, currentSubscription, newPlanPrice, newPlanInterval, newPlanIntervalCount]);

  const handleConfirm = async () => {
    setIsUpdating(true);
    setMessage(null);

    try {
      await onConfirm();
      setMessage({ type: 'success', text: `✅ Successfully changed to ${planName}!` });
      
      // Close after showing success
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error: any) {
      setMessage({ type: 'error', text: `❌ ${error.message || 'Failed to update plan'}` });
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-card border-4 border-foreground rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full p-8"
        >
          <h3 className="text-3xl font-black font-handwritten text-center mb-4">
            Change to {planName}?
          </h3>
          
          {proration && (
            <div className="space-y-4 mb-6">
              {/* Main Charge Display */}
              {proration.isUpgrade ? (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-4 border-blue-500 rounded-2xl p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <span className="text-sm font-handwritten font-bold text-blue-900 uppercase">Upgrading</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <DollarSign className="w-8 h-8 text-blue-900" />
                    <span className="text-5xl font-black font-handwritten text-blue-900">
                      {proration.charge.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm font-handwritten font-bold text-blue-700 mt-2">
                    Charged today (prorated)
                  </p>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-4 border-green-500 rounded-2xl p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingDown className="w-6 h-6 text-green-600" />
                    <span className="text-sm font-handwritten font-bold text-green-900 uppercase">Downgrading</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <DollarSign className="w-8 h-8 text-green-900" />
                    <span className="text-5xl font-black font-handwritten text-green-900">
                      0.00
                    </span>
                  </div>
                  <p className="text-sm font-handwritten font-bold text-green-700 mt-2">
                    No charge today
                  </p>
                </div>
              )}

              {/* Breakdown */}
              <div className="bg-muted/30 border-2 border-foreground/10 rounded-xl p-4 space-y-2 text-sm font-handwritten">
                <div className="flex justify-between">
                  <span className="opacity-70">Days remaining:</span>
                  <span className="font-black">{proration.daysRemaining} days</span>
                </div>
                {proration.isUpgrade && (
                  <>
                    <div className="flex justify-between">
                      <span className="opacity-70">Unused credit:</span>
                      <span className="font-black text-green-600">-${proration.credit.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">New plan cost:</span>
                      <span className="font-black">+${proration.newPlanCost.toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-foreground/10 my-2"></div>
                    <div className="flex justify-between text-base">
                      <span className="font-black">Total due today:</span>
                      <span className="font-black text-primary">${proration.charge.toFixed(2)}</span>
                    </div>
                  </>
                )}
                {!proration.isUpgrade && (
                  <p className="text-center italic opacity-60 py-2">
                    Change takes effect on {new Date(currentSubscription.renews_at || currentSubscription.ends_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          )}

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl mb-4 text-center font-handwritten font-bold ${
                message.type === 'success' ? 'bg-green-50 text-green-900 border-2 border-green-200' : 'bg-red-50 text-red-900 border-2 border-red-200'
              }`}
            >
              {message.text}
            </motion.div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={onClose}
              disabled={isUpdating}
              variant="outline"
              className="flex-1 h-14 font-handwritten text-lg font-black border-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isUpdating}
              className="flex-1 h-14 font-handwritten text-lg font-black bg-gradient-to-r from-primary to-accent border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              {isUpdating ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    ⌛
                  </motion.span>
                  Updating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Confirm Change
                </span>
              )}
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-4 font-handwritten">
            * Proration is calculated based on time remaining in your billing cycle
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
