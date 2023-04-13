import { AccountType } from './enum/account-type.enum';

export interface AccountInfo {
  userID: string;
  displayName: string;
  avatarURL: string;
  accountType: AccountType;
}
