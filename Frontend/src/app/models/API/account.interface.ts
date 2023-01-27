import { AccountStatus } from '../enum/account-status.enum';
import { AccountType } from '../enum/account-type.enum';

export interface Account {
  accountID: string;
  accountType: AccountType;
  accountStatus: AccountStatus;
}
