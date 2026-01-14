import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export const createAdminClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        console.error('Admin Client Error: SUPABASE_SERVICE_ROLE_KEY is missing');
        throw new Error('Supabase Service Role Key is missing. Check your production environment variables.');
    }

    return createClient<Database>(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
            detectSessionInUrl: false
        },
        global: {
            headers: {
                Authorization: `Bearer ${supabaseServiceKey}`
            }
        }
    });
};
