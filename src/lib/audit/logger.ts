import { SupabaseClient } from '@supabase/supabase-js';

export interface AuditLogEntry {
  actorId?: string;
  actorRole: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  changesJson?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export async function logAuditEvent(
  supabase: SupabaseClient,
  entry: AuditLogEntry
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('audit_events').insert({
      actor_id: entry.actorId || null,
      actor_role: entry.actorRole,
      action: entry.action,
      resource_type: entry.resourceType,
      resource_id: entry.resourceId || null,
      changes_json: entry.changesJson || null,
      ip_address: entry.ipAddress || null,
      user_agent: entry.userAgent || null,
    });

    if (error) {
      console.error('[AUDIT_LOG_ERROR]', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown audit error';
    console.error('[AUDIT_LOG_EXCEPTION]', message);
    return { success: false, error: message };
  }
}
