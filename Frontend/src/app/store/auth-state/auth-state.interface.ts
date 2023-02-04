import { AccountType } from 'src/app/models/enum/account-type.enum';

export interface AuthState {
  authToken: string;
  accountID: string;
  displayName: string;
  accountType: AccountType;
}
