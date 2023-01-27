import { AccountStatus } from '../../enum/account-status.enum';

export interface UserUpdateManagementRequest {
  userID: string;
  accountStatus: AccountStatus;
}
