import { AccountStatus } from '../enum/account-status.enum';
import { AccountType } from '../enum/account-type.enum';

export interface User {
  userID: string;
  characterName: string;
  characterServer: string;
  characterAvatarURL: string;
  accountType: AccountType;
  accountStatus: AccountStatus;
}
