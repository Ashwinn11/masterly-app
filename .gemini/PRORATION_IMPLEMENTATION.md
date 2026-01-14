# Proration Implementation - Final Steps

## ✅ What's Complete:

1. **Proration Calculator** (`/src/lib/proration.ts`)
   - Calculates exact charges based on days remaining
   - Uses dynamic pricing (no hardcoded values)
   - Supports all billing intervals

2. **Updated PlanChangeModal** (`/src/components/PlanChangeModal.tsx`)
   - Displays proration breakdown
   - Shows charge amount prominently
   - Different UI for upgrades vs downgrades

3. **Updated Interfaces**
   - Paywall accepts `currentSubscription` prop
   - Billing page passes subscription data

## 🔧 What Needs to be Done:

### 1. Update Paywall Component (`/src/components/Paywall.tsx`)

**Add state for pending plan data:**
```typescript
const [pendingPlanData, setPendingPlanData] = useState<{
  price: number;
  interval: string;
  intervalCount: number;
} | null>(null);
```

**Update `handleSubscribe` function to accept variant data:**
```typescript
const handleSubscribe = async (variantId: string, variantData: any) => {
  if (variantId === currentVariantId) return;
  
  setSelectedVariantId(variantId);
  
  try {
    if (currentVariantId) {
      setPendingVariantId(variantId);
      setPendingPlanData({
        price: variantData.price / 100, // Convert cents to dollars
        interval: variantData.interval || 'month',
        intervalCount: variantData.interval_count || 1,
      });
      setShowConfirmModal(true);
      return;
    }
    
    // ... rest of checkout logic
  }
}
```

**Update button click to pass variant data:**
Find where buttons call `handleSubscribe` and change from:
```typescript
onClick={() => handleSubscribe(p.variantId)}
```
To:
```typescript
onClick={() => handleSubscribe(p.variantId, p.variantData)}
```

**Update PlanChangeModal call (around line 394):**
```typescript
<PlanChangeModal
  isOpen={showConfirmModal}
  onClose={() => {
    setShowConfirmModal(false);
    setPendingVariantId(null);
    setPendingPlanData(null);
  }}
  onConfirm={handleConfirmUpdate}
  planName={getPlanName(pendingVariantId || "")}
  currentSubscription={currentSubscription}
  newVariantId={pendingVariantId || ""}
  newPlanPrice={pendingPlanData?.price || 0}
  newPlanInterval={pendingPlanData?.interval || "month"}
  newPlanIntervalCount={pendingPlanData?.intervalCount || 1}
/>
```

### 2. Update Paywall Props Destructuring (around line 70)

Add `currentSubscription` to the destructured props:
```typescript
export function Paywall({
  onClose,
  onSubscribe,
  showCloseButton = true,
  title = "Unlock Masterly Pro",
  subtitle = "Join 10,000+ students mastering their studies",
  currentVariantId,
  currentSubscription  // Add this
}: PaywallProps) {
```

### 3. Test the Flow

1. Go to `/profile/billing`
2. Click "Upgrade or Change Plan"
3. Select a different plan
4. Confirm modal should show:
   - Exact charge amount
   - Days remaining
   - Unused credit
   - New plan cost
   - Total due

## 📝 Expected User Experience:

**Upgrade (Monthly $9.99 → Yearly $99):**
```
Change to Yearly Pro?

[Blue Card]
UPGRADING
$89.50
Charged today (prorated)

Days remaining: 20 days
Unused credit: -$6.50
New plan cost: +$96.00
─────────────────────
Total due today: $89.50

[Cancel] [Confirm Change]
```

**Downgrade (Monthly $9.99 → Weekly $4.99):**
```
Change to Weekly Pro?

[Green Card]
DOWNGRADING
$0.00
No charge today

Days remaining: 20 days
Change takes effect on Feb 14, 2026

[Cancel] [Confirm Change]
```

## 🐛 Known Issues to Fix:

1. **Downgrade Database Update**: Currently updates variant_id immediately, should wait until renewal
2. **Payment Failure Handling**: Need better error messages
3. **Network Timeout**: No retry logic

## 🚀 Next Priority:

Complete the Paywall updates above to enable proration display.
