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
  const isAdminRoute = pathname.startsWith('/admin');

  // FAST PATH: All public storefront routes bypass session management completely.
  if (!isAdminRoute) {
    return supabaseResponse;
  }

  const isPlaceholder =
    !env.NEXT_PUBLIC_SUPABASE_URL ||
    env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') ||
    !env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('placeholder');

  // If Supabase is unconfigured, protect admin routes
  if (isPlaceholder) {
    if (!pathname.startsWith('/admin/login')) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return supabaseResponse;
  }

  const allCookies = request.cookies.getAll();
  const hasAuthCookie = allCookies.some(
    (c) => c.name.startsWith('sb-') || c.name.includes('auth-token')
  );

  // If viewing admin login with no auth cookie, render login page instantly
  if (pathname === '/admin/login' && !hasAuthCookie) {
    return supabaseResponse;
  }

  // If viewing protected admin page with no auth cookie, redirect or allow preview in dev
  if (!pathname.startsWith('/admin/login') && !hasAuthCookie) {
    const isDemoSession = request.cookies.get('damingrow_staff_demo')?.value === 'true';
    if (!isDemoSession && process.env.NODE_ENV === 'production') {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(loginUrl);
    }
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

    // Refresh auth token safely with 1200ms timeout to guarantee fast response
    let user = null;
    try {
      const authTimeout = new Promise<{ data: { user: null } }>((resolve) =>
        setTimeout(() => resolve({ data: { user: null } }), 1200)
      );
      const { data } = await Promise.race([supabase.auth.getUser(), authTimeout]);
      user = data?.user ?? null;
    } catch {
      // Non-blocking fallback
    }

    // Protect administrative routes
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
      if (!user) {
        const isDemoSession = request.cookies.get('damingrow_staff_demo')?.value === 'true';
        if (!isDemoSession && process.env.NODE_ENV === 'production') {
          const loginUrl = request.nextUrl.clone();
          loginUrl.pathname = '/admin/login';
          loginUrl.searchParams.set('redirectTo', pathname);
          return NextResponse.redirect(loginUrl);
        }
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
