import { ROLE } from './role.interface';
export interface User {
  firstName: string;
  lastName: string;
  middleName: string;
  mobileNumber: string;
  _roleId?: ROLE;
}
export enum USER_REDUCER_ACTIONS {
  SetUser = 'SET_USER',
  ResetUser = 'RESET_USER',
}
