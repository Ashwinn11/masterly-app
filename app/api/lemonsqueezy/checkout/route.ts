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
    } catch (error) {
        console.error('Checkout creation error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
