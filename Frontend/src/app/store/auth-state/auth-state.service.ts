import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountCreateRequest } from 'src/app/models/API/Request/account-create-request.interface';
import { AccountLoginRequest } from 'src/app/models/API/Request/account-login-request.interface';
import { AccountType } from 'src/app/models/enum/account-type.enum';
import { AuthStateActions } from './auth-state.actions';
import { AuthStateSelectors } from './auth-state.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  authToken$: Observable<string> = this.store.select(AuthStateSelectors.authToken);
  userID$: Observable<string> = this.store.select(AuthStateSelectors.userID);
  displayName$: Observable<string> = this.store.select(AuthStateSelectors.displayName);
  accountType$: Observable<AccountType> = this.store.select(AuthStateSelectors.accountType);

  constructor(private store: Store) {}

  onRegisterRequest(request: AccountCreateRequest): void {
    this.store.dispatch(AuthStateActions.registerAttempt({ request }));
  }

  onLoginRequest(request: AccountLoginRequest): void {
    this.store.dispatch(AuthStateActions.loginAttempt({ request }));
  }

  onLogOut(): void {
    this.store.dispatch(AuthStateActions.logOutAttempt());
  }

  onAuthDataInfoUpdated(displayName: string): void {
    this.store.dispatch(AuthStateActions.AUTH_DATA_INFO_UPDATED({ displayName }));
  }
}
