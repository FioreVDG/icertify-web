import { ROLE } from './role.interface';
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  mobileNumber: string;
  _roleId?: ROLE;
  email?: string;
  gender?: string;
  _brgyId?: string;
  _role?: any;
  type?: string;
  isMain?: boolean;
}
export enum USER_REDUCER_ACTIONS {
  SetUser = 'SET_USER',
  ResetUser = 'RESET_USER',
}
