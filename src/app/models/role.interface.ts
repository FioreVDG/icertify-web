import { NavNode } from './treesidenav.interface';

export interface ROLE {
  _id: string;
  name: string;
  description: string;
  access: NavNode[];
  status: string;
  _tenantId: string;
  _createdBy?: string;
  createdAt: string;
  updatedAt?: string;
  accessCount?: number;
  hasMobileAppAccess: boolean;
}
