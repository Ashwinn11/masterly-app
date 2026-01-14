import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/lemonsqueezy-service';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
    return NextResponse.json({ message: 'Checkout API is reachable' });
}

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();

        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { variantId, customData } = body;

        if (!variantId) {
            return NextResponse.json({ error: 'Variant ID is required' }, { status: 400 });
        }

        // Create checkout session
        const checkoutUrl = await createCheckoutSession(
            variantId,
            user.id,
            user.email || '',
            customData
        );

        if (!checkoutUrl) {
            return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
        }

        return NextResponse.json({ checkoutUrl });
    } catch (error: any) {
        // Log the full error for debugging (check the terminal)
        console.error('Checkout creation error detail:', error);

        // Extract the most helpful error message from Lemon Squeezy if available
        const message = error.response?.data?.errors?.[0]?.detail ||
            error.message ||
            'Internal server error';

        return NextResponse.json(
            { error: message, details: error.response?.data || error.message },
            { status: error.response?.status || 500 }
        );
    }
}
