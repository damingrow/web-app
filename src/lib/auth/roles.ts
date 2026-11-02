export type StaffRole = 'super_admin' | 'sales_agent' | 'content_editor' | 'veterinary_consultant' | 'anon';

export interface UserPermissions {
  canManageStaff: boolean;
  canManageCatalog: boolean;
  canManagePricing: boolean;
  canViewEnquiries: boolean;
  canManageEnquiries: boolean;
  canManageContent: boolean;
  canViewAuditLogs: boolean;
  canManageSettings: boolean;
}

export const ROLE_PERMISSIONS: Record<StaffRole, UserPermissions> = {
  super_admin: {
    canManageStaff: true,
    canManageCatalog: true,
    canManagePricing: true,
    canViewEnquiries: true,
    canManageEnquiries: true,
    canManageContent: true,
    canViewAuditLogs: true,
    canManageSettings: true,
  },
  sales_agent: {
    canManageStaff: false,
    canManageCatalog: false,
    canManagePricing: false,
    canViewEnquiries: true,
    canManageEnquiries: true,
    canManageContent: false,
    canViewAuditLogs: false,
    canManageSettings: false,
  },
  content_editor: {
    canManageStaff: false,
    canManageCatalog: true,
    canManagePricing: false, // Cannot change financial pricing
    canViewEnquiries: false,
    canManageEnquiries: false,
    canManageContent: true,
    canViewAuditLogs: false,
    canManageSettings: false,
  },
  veterinary_consultant: {
    canManageStaff: false,
    canManageCatalog: false,
    canManagePricing: false,
    canViewEnquiries: true, // Can review clinical & disease consultation requests
    canManageEnquiries: false,
    canManageContent: true, // Can write and review medical articles
    canViewAuditLogs: false,
    canManageSettings: false,
  },
  anon: {
    canManageStaff: false,
    canManageCatalog: false,
    canManagePricing: false,
    canViewEnquiries: false,
    canManageEnquiries: false,
    canManageContent: false,
    canViewAuditLogs: false,
    canManageSettings: false,
  },
};

export function hasPermission(role: StaffRole, permission: keyof UserPermissions): boolean {
  const perms = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.anon;
  return Boolean(perms[permission]);
}
