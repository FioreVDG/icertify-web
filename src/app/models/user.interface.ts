import { ROLE } from './role.interface';
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  mobileNumber: string;
  _roleId?: ROLE;
  email?: string;
}
export enum USER_REDUCER_ACTIONS {
  SetUser = 'SET_USER',
  ResetUser = 'RESET_USER',
}
