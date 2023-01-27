import { AccountType } from 'src/app/models/enum/account-type.enum';

export interface AuthState {
  authToken: string;
  userID: string;
  userAvatarURL: string;
  userName: string;
  userServer: string;
  accountType: AccountType;
}
