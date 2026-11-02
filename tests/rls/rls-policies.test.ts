import { describe, it, expect } from 'vitest';
import { hasPermission, ROLE_PERMISSIONS, type StaffRole } from '@/lib/auth/roles';

describe('Role-Based Access Control & RLS Permissions', () => {
  it('strictly blocks anonymous users from administrative and enquiry data', () => {
    const anon = 'anon' as StaffRole;
    expect(hasPermission(anon, 'canManageStaff')).toBe(false);
    expect(hasPermission(anon, 'canManagePricing')).toBe(false);
    expect(hasPermission(anon, 'canViewEnquiries')).toBe(false);
    expect(hasPermission(anon, 'canViewAuditLogs')).toBe(false);
    expect(hasPermission(anon, 'canManageSettings')).toBe(false);
  });

  it('restricts sales agents to enquiry handling without catalog or pricing modification rights', () => {
    const agent = 'sales_agent' as StaffRole;
    expect(hasPermission(agent, 'canViewEnquiries')).toBe(true);
    expect(hasPermission(agent, 'canManageEnquiries')).toBe(true);
    expect(hasPermission(agent, 'canManagePricing')).toBe(false);
    expect(hasPermission(agent, 'canManageStaff')).toBe(false);
    expect(hasPermission(agent, 'canViewAuditLogs')).toBe(false);
  });

  it('restricts content editors from viewing customer enquiries or modifying pricing', () => {
    const editor = 'content_editor' as StaffRole;
    expect(hasPermission(editor, 'canManageContent')).toBe(true);
    expect(hasPermission(editor, 'canManageCatalog')).toBe(true);
    expect(hasPermission(editor, 'canManagePricing')).toBe(false); // Prevents unauthorized price tampering
    expect(hasPermission(editor, 'canViewEnquiries')).toBe(false); // Protects customer lead confidentiality
  });

  it('ensures only super_admin holds full administrative governance', () => {
    const admin = 'super_admin' as StaffRole;
    const allPermissions = Object.keys(ROLE_PERMISSIONS.super_admin) as Array<
      keyof typeof ROLE_PERMISSIONS.super_admin
    >;

    for (const perm of allPermissions) {
      expect(hasPermission(admin, perm)).toBe(true);
    }
  });
});
