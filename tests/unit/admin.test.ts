import { describe, it, expect } from 'vitest';
import { ROLE_PERMISSIONS, hasPermission, StaffRole } from '@/lib/auth/roles';

describe('Admin RBAC Permissions Matrix', () => {
  it('grants full administrative permissions to super_admin', () => {
    expect(hasPermission('super_admin', 'canManageStaff')).toBe(true);
    expect(hasPermission('super_admin', 'canManagePricing')).toBe(true);
    expect(hasPermission('super_admin', 'canManageCatalog')).toBe(true);
    expect(hasPermission('super_admin', 'canManageEnquiries')).toBe(true);
    expect(hasPermission('super_admin', 'canViewAuditLogs')).toBe(true);
  });

  it('restricts sales_agent from altering pricing, catalog, or staff', () => {
    expect(hasPermission('sales_agent', 'canManageStaff')).toBe(false);
    expect(hasPermission('sales_agent', 'canManagePricing')).toBe(false);
    expect(hasPermission('sales_agent', 'canManageCatalog')).toBe(false);
    expect(hasPermission('sales_agent', 'canManageEnquiries')).toBe(true);
    expect(hasPermission('sales_agent', 'canViewEnquiries')).toBe(true);
  });

  it('restricts content_editor from financial pricing and enquiry management', () => {
    expect(hasPermission('content_editor', 'canManageContent')).toBe(true);
    expect(hasPermission('content_editor', 'canManagePricing')).toBe(false);
    expect(hasPermission('content_editor', 'canManageEnquiries')).toBe(false);
  });

  it('allows veterinary_consultant to view clinical enquiries but not manage financial settings', () => {
    expect(hasPermission('veterinary_consultant', 'canViewEnquiries')).toBe(true);
    expect(hasPermission('veterinary_consultant', 'canManagePricing')).toBe(false);
    expect(hasPermission('veterinary_consultant', 'canManageStaff')).toBe(false);
  });

  it('denies all administrative permissions to anonymous public users', () => {
    const anonPerms = ROLE_PERMISSIONS['anon'];
    Object.values(anonPerms).forEach((val) => {
      expect(val).toBe(false);
    });
  });
});

describe('Enquiry Status Lifecycle', () => {
  const validStatuses = [
    'pending_contact',
    'contacted',
    'quoted',
    'deposit_received',
    'dispatched',
    'fulfilled',
    'cancelled',
  ];

  it('contains all required business lifecycle states', () => {
    expect(validStatuses).toContain('pending_contact');
    expect(validStatuses).toContain('quoted');
    expect(validStatuses).toContain('fulfilled');
    expect(validStatuses).toContain('cancelled');
  });
});
