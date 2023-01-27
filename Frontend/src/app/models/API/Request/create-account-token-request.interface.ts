import { AccountType } from "../../enum/account-type.enum";

export interface CreateAccountTokenRequest {
    AccountType: AccountType;
}