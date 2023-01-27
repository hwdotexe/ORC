import { AccountStatus } from '../../enum/account-status.enum';

export interface AccountStatusChangeRequest {
  userID: string;
  accountStatus: AccountStatus;
}
