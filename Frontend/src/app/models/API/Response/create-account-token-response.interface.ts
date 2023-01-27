import { AccountType } from '../../enum/account-type.enum';

export interface CreateAccountTokenResponse {
  tokenID: string;
  accountType: AccountType;
  token: string;
}
