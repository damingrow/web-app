import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { env } from '@/lib/env';

/**
 * Middleware session refresher for Next.js App Router on Cloudflare Workers.
 * Updates auth cookies safely so sessions do not expire mid-flight.
 * Never throws or blocks public requests even if Supabase is unreachable.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const pathname = request.nextUrl.pathname;
  const isPlaceholder =
    !env.NEXT_PUBLIC_SUPABASE_URL ||
    env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') ||
    !env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('placeholder');

  // If Supabase is unconfigured, pass through immediately
  if (isPlaceholder) {
    return supabaseResponse;
  }

  const isAdminRoute = pathname.startsWith('/admin');
  const allCookies = request.cookies.getAll();
  const hasAuthCookie = allCookies.some(
    (c) => c.name.startsWith('sb-') || c.name.includes('auth-token')
  );

  // FAST PATH: Storefront public navigation without auth cookies bypasses Supabase network calls entirely.
  // This ensures instant page loads without blocking on external auth network round-trips.
  if (!isAdminRoute && !hasAuthCookie) {
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Refresh auth token safely with error handling
    let user = null;
    try {
      const { data } = await supabase.auth.getUser();
      user = data?.user ?? null;
    } catch (authError) {
      // Supabase network / auth error is non-fatal for public navigation
      console.warn('Supabase auth session refresh warning (continuing):', authError);
    }

    // Protect administrative routes
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
      const isDemoSession = request.cookies.get('damingrow_staff_demo')?.value === 'true';
      if (!user && !isDemoSession && process.env.NODE_ENV === 'production') {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = '/admin/login';
        loginUrl.searchParams.set('redirectTo', pathname);
        return NextResponse.redirect(loginUrl);
      }
    }

    // Redirect already authenticated users away from the login page
    if (pathname === '/admin/login' && user) {
      const adminUrl = request.nextUrl.clone();
      adminUrl.pathname = '/admin';
      return NextResponse.redirect(adminUrl);
    }
  } catch (err) {
    console.error('Non-fatal middleware error in updateSession:', err);
  }

  return supabaseResponse;
}
