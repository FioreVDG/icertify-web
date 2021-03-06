import { NavNode } from './../models/treesidenav.interface';
export const NOTARY_NAVS: NavNode[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: 'notary-dashboard',
    hasAccess: false,
  },
  {
    label: 'Document Receiving',
    icon: 'assignment_returned',
    route: 'document-receiving',
    hasAccess: false,
  },
  {
    label: 'Video Conferencing',
    icon: 'videocam',
    route: 'video-conference',
    hasAccess: false,
  },
  {
    label: 'Document Releasing to Courier',
    icon: 'delivery_dining',
    route: 'document-releasing-to-courier',
    hasAccess: false,
  },
  {
    label: 'Uploading of Notarized Document',
    icon: 'upload_file',
    route: 'uploading-notarized-document',
    hasAccess: false,
  },
  {
    label: 'Transaction History',
    icon: 'receipt_long',
    route: 'transaction-history',
    hasAccess: false,
  },
  {
    label: 'Document Tracker',
    icon: 'account_tree',
    route: 'document-tracker',
    hasAccess: false,
  },
  {
    label: 'Reports',
    icon: 'analytics',
    route: 'reports',
    hasAccess: false,
  },
];

export const BARANGAY_NAVS: NavNode[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: 'barangay-dashboard',
    hasAccess: false,
  },
  {
    label: 'Registration',
    icon: 'person_add_alt',
    route: 'registration',
    hasAccess: false,
  },
  {
    label: 'New Transaction',
    icon: 'post_add',
    route: 'new-transaction',
    hasAccess: false,
  },
  {
    label: 'Registrants Database',
    icon: 'contact_mail',
    route: 'registrant-db',
    hasAccess: false,
  },
  {
    label: 'Document Receiving',
    icon: 'file_copy',
    route: 'document-receiving',
    hasAccess: false,
  },
  {
    label: 'Batch Delivery Management',
    icon: 'moped',
    route: 'batch-delivery-management',
    hasAccess: false,
  },
  {
    label: 'Video Conferencing',
    icon: 'videocam',
    route: 'video-conference',
    hasAccess: false,
  },
  {
    label: 'Document Receiving from Notary',
    icon: 'fact_check',
    route: 'notarized-document-receiving',
    hasAccess: false,
  },
  {
    label: 'Document Releasing to Indigent',
    icon: 'verified',
    route: 'notarized-document-releasing',
    hasAccess: false,
  },
  {
    label: 'Transaction History',
    icon: 'receipt_long',
    route: 'transaction-history',
    hasAccess: false,
  },
  {
    label: 'Document Tracker',
    icon: 'account_tree',
    route: 'document-tracker',
    hasAccess: false,
  },
];

export const SUPERADMIN_NAVS: NavNode[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: 'admin-dashboard',
    hasAccess: false,
  },
  {
    label: 'Account Creation',
    icon: 'person_add',
    route: 'account-creation',
    hasAccess: false,
  },
  {
    label: 'SLA',
    icon: 'description',
    route: 'sla',
    hasAccess: false,
  },
  {
    label: 'Clusters',
    icon: 'adjust',
    route: 'clusters',
    hasAccess: false,
  },
  {
    label: 'Riders',
    icon: 'moped',
    route: 'riders',
    hasAccess: false,
  },
  {
    label: 'Reports',
    icon: 'summarize',
    route: 'reports',
    hasAccess: false,
  },
];
