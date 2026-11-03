import { NextResponse } from 'next/server';
import { createServerSupabaseClient, createAdminClient } from '@/lib/supabase/server';
import { env } from '@/lib/env';

export type StaffRole = 'super_admin' | 'sales_agent' | 'content_editor' | 'veterinary_consultant';

export interface AuthenticatedStaff {
  userId: string;
  email: string;
  role: StaffRole;
  fullName: string;
}

/**
 * Server-side Authentication & RBAC Guard for Administrative Route Handlers and Server Actions.
 * Verifies Supabase session from HTTP-only cookies and checks active staff privileges.
 */
export async function requireStaffSession(
  allowedRoles: StaffRole[] = ['super_admin']
): Promise<{ errorResponse?: NextResponse; staff?: AuthenticatedStaff }> {
  const isPlaceholder =
    !env.NEXT_PUBLIC_SUPABASE_URL ||
    env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') ||
    !env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('placeholder');

  if (isPlaceholder) {
    return {
      errorResponse: NextResponse.json(
        { success: false, message: 'Unauthorized: Authentication service unconfigured' },
        { status: 401 }
      ),
    };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        errorResponse: NextResponse.json(
          { success: false, message: 'Unauthorized: Authentication required' },
          { status: 401 }
        ),
      };
    }

    // Verify staff profile and assigned role
    let role: StaffRole = 'sales_agent';
    let fullName = user.user_metadata?.full_name || 'Staff Member';

    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const adminDb = createAdminClient();
        const { data: profile, error: profileError } = await adminDb
          .from('staff_profiles')
          .select('role, full_name, is_active')
          .eq('id', user.id)
          .single();

        if (profileError || !profile || !profile.is_active) {
          // If staff profile record not found, check user metadata fallback
          const metaRole = user.user_metadata?.role as StaffRole | undefined;
          if (metaRole && allowedRoles.includes(metaRole)) {
            role = metaRole;
          } else if (!profile) {
            return {
              errorResponse: NextResponse.json(
                { success: false, message: 'Forbidden: No active staff profile found for this account' },
                { status: 403 }
              ),
            };
          } else {
            return {
              errorResponse: NextResponse.json(
                { success: false, message: 'Forbidden: Staff account is deactivated' },
                { status: 403 }
              ),
            };
          }
        } else {
          role = profile.role as StaffRole;
          if (profile.full_name) fullName = profile.full_name;
        }
      } catch (dbErr) {
        console.error('Failed to query staff_profiles:', dbErr);
        const metaRole = user.user_metadata?.role as StaffRole | undefined;
        if (metaRole) role = metaRole;
      }
    }

    if (!allowedRoles.includes(role)) {
      return {
        errorResponse: NextResponse.json(
          { success: false, message: `Forbidden: Role '${role}' lacks permission for this action` },
          { status: 403 }
        ),
      };
    }

    return {
      staff: {
        userId: user.id,
        email: user.email || '',
        role,
        fullName,
      },
    };
  } catch (err) {
    console.error('Error in requireStaffSession:', err);
    return {
      errorResponse: NextResponse.json(
        { success: false, message: 'Internal server error verifying session' },
        { status: 500 }
      ),
    };
  }
}
