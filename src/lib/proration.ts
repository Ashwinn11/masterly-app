/**
 * Calculate proration for subscription plan changes
 * Matches Lemon Squeezy's proration logic
 * Fetches current prices from Lemon Squeezy API
 */

export interface ProrationResult {
    charge: number;
    credit: number;
    newPlanCost: number;
    daysRemaining: number;
    isUpgrade: boolean;
}

interface PlanPricing {
    price: number;
    interval: 'day' | 'week' | 'month' | 'year';
    intervalCount: number;
}

/**
 * Get the number of days in a billing interval
 */
function getIntervalDays(interval: string, intervalCount: number): number {
    switch (interval) {
        case 'day':
            return intervalCount;
        case 'week':
            return intervalCount * 7;
        case 'month':
            return intervalCount * 30; // Approximate
        case 'year':
            return intervalCount * 365;
        default:
            return 30; // Default to monthly
    }
}

/**
 * Calculate proration based on current and new plan pricing
 */
export function calculateProration(
    currentPlan: PlanPricing,
    newPlan: PlanPricing,
    renewsAt: string
): ProrationResult {
    // Calculate days remaining in current billing cycle
    const now = new Date();
    const renewalDate = new Date(renewsAt);
    const msRemaining = renewalDate.getTime() - now.getTime();
    const daysRemaining = Math.max(0, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)));

    // Calculate total days in each billing cycle
    const currentCycleDays = getIntervalDays(currentPlan.interval, currentPlan.intervalCount);
    const newCycleDays = getIntervalDays(newPlan.interval, newPlan.intervalCount);

    // Calculate daily rates
    const currentDailyRate = currentPlan.price / currentCycleDays;
    const newDailyRate = newPlan.price / newCycleDays;

    // Calculate unused credit from current plan
    const credit = currentDailyRate * daysRemaining;

    // LEMON SQUEEZY BEHAVIOR:
    // When upgrading with invoice_immediately=true, they start a NEW full cycle immediately.
    // So the charge is: (Full New Plan Price) - (Unused Credit)
    // The new cycle starts today and runs for the full new interval.

    // Calculate final charge
    const charge = Math.max(0, newPlan.price - credit);

    const isUpgrade = newPlan.price > currentPlan.price;

    return {
        charge: Math.round(charge * 100) / 100, // Round to 2 decimals
        credit: Math.round(credit * 100) / 100,
        newPlanCost: newPlan.price, // Display full price as the base cost
        daysRemaining,
        isUpgrade,
    };
}

export function formatProrationMessage(proration: ProrationResult): string {
    if (proration.isUpgrade) {
        return `You'll be charged $${proration.charge.toFixed(2)} today (prorated for ${proration.daysRemaining} days remaining).`;
    } else {
        return `Your plan will change at the next renewal. You have ${proration.daysRemaining} days remaining on your current plan.`;
    }
}

/**
 * Get plan pricing from subscription data
 * This extracts the price and interval from the subscription record
 */
export function getPlanPricingFromSubscription(subscription: any): PlanPricing {
    // Lemon Squeezy stores price in cents, convert to dollars
    const price = subscription.price ? parseFloat(subscription.price) / 100 : 0;

    return {
        price,
        interval: subscription.billing_interval || 'month',
        intervalCount: subscription.billing_interval_count || 1,
    };
}
