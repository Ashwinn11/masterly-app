import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/lemonsqueezy-service';

export async function GET() {
    try {
        const products = await getProducts();
        return NextResponse.json({ products });
    } catch (error) {
        console.error('Products fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}
