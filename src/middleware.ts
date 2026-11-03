import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  try {
    return await updateSession(request);
  } catch (error) {
    console.error('Unhandled middleware error, continuing safely:', error);
    return NextResponse.next({ request });
  }
}

export const config = {
  matcher: [
    /*
     * Only administrative routes and admin APIs require session verification.
     * All storefront public routes bypass middleware entirely for instant navigation.
     */
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};
