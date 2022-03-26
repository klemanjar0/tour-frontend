import { UserRoles } from '../auth/types';
import { UserRole } from '../constants';

export const getUserRoleTitle = (role: UserRoles) => {
  return UserRole[role];
};
