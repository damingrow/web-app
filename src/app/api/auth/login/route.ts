import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limiter';

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    // Rate limit: 10 attempts per minute per IP
    const rateCheck = checkRateLimit(`auth-login:${clientIp}`, { maxRequests: 10, windowMs: 60000 });
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many authentication attempts. Please wait 60 seconds before trying again.',
          retryAfterSeconds: rateCheck.resetInSeconds,
        },
        { status: 429 }
      );
    }

    let email = '';
    let password = '';

    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await request.json();
      email = body.email || '';
      password = body.password || '';
    } else {
      const formData = await request.formData();
      email = formData.get('email')?.toString() || '';
      password = formData.get('password')?.toString() || '';
    }

    email = email.trim().toLowerCase();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide both an email address and password.' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.warn('Supabase auth sign-in error:', error.message);
      let userFriendlyMessage = error.message;

      if (error.message.toLowerCase().includes('invalid login credentials')) {
        userFriendlyMessage =
          'Invalid credentials. Please verify your email and password in Supabase Auth (Authentication > Users).';
      } else if (error.message.toLowerCase().includes('email not confirmed')) {
        userFriendlyMessage =
          'Email not confirmed. Please confirm your email in the Supabase Auth Dashboard or disable "Confirm email" in Auth settings.';
      }

      return NextResponse.json(
        {
          success: false,
          message: userFriendlyMessage,
          rawError: error.message,
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Authentication successful.',
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      redirectTo: '/admin',
    });
  } catch (err: unknown) {
    console.error('Unexpected exception during /api/auth/login:', err);
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : 'Internal authentication server error.',
      },
      { status: 500 }
    );
  }
}
