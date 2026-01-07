import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');
  const next = searchParams.get('next') ?? '/dashboard';

  // Check if Supabase returned an error (e.g., database trigger failure)
  if (error) {
    console.error('[Auth Callback] Supabase OAuth error:', {
      error,
      error_code: searchParams.get('error_code'),
      error_description: errorDescription
    });
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  if (code) {
    const supabase = await createClient();
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (!exchangeError) {
      console.log('[Auth Callback] Successfully exchanged code for session:', data.user?.id);

      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    } else {
      console.error('[Auth Callback] Error exchanging code:', exchangeError);
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
