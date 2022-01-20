import { NavNode } from './treesidenav.interface';

export interface ROLE {
  _id: String;
  name: String;
  description: String;
  access: NavNode[];
  status: String;
  _tenantId: String;
  _createdBy?: String;
  createdAt: String;
  updatedAt?: String;
  accessCount?: Number;
  hasMobileAppAccess: Boolean;
}
