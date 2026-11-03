import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.signOut();
    return NextResponse.json({ success: true, redirectTo: '/admin/login' });
  } catch (err: unknown) {
    console.error('Logout error:', err);
    return NextResponse.json({ success: true, redirectTo: '/admin/login' });
  }
}
