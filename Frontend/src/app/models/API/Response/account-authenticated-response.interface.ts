import { AccountType } from '../../enum/account-type.enum';

export interface AccountAuthenticatedResponse {
  authToken: string;
  accountID: string;
  avatarURL: string;
  displayName: string;
  accountType: AccountType;
}
