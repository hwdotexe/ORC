import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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

  onAuthDataReceived(authToken: string, userid: string, displayName: string, accountType: AccountType): void {
    this.store.dispatch(AuthStateActions.AUTH_DATA_RECEIVED({ authToken, userid, displayName, accountType }));
  }

  onAuthDataCleared(): void {
    this.store.dispatch(AuthStateActions.AUTH_DATA_CLEARED());
  }

  onAuthDataInfoUpdated(displayName: string): void {
    this.store.dispatch(AuthStateActions.AUTH_DATA_INFO_UPDATED({ displayName }));
  }
}
