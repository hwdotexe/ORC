import { AccountType } from '../../enum/account-type.enum';

export interface LoginResponse {
  authToken: string;
  userID: string;
  userAvatarURL: string;
  userName: string;
  userServer: string;
  accountType: AccountType;
}
