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
  userAvatarURL$: Observable<string> = this.store.select(AuthStateSelectors.userAvatarURL);
  userName$: Observable<string> = this.store.select(AuthStateSelectors.userName);
  userServer$: Observable<string> = this.store.select(AuthStateSelectors.userServer);
  accountType$: Observable<AccountType> = this.store.select(AuthStateSelectors.accountType);

  constructor(private store: Store) {}

  onAuthDataReceived(authToken: string, userid: string, userAvatarURL: string, userName: string, userServer: string, accountType: AccountType): void {
    this.store.dispatch(AuthStateActions.AUTH_DATA_RECEIVED({ authToken, userid, userAvatarURL, userName, userServer, accountType }));
  }

  onAuthDataCleared(): void {
    this.store.dispatch(AuthStateActions.AUTH_DATA_CLEARED());
  }

  onAuthDataCharacterUpdated(characterName: string, avatarURL: string): void {
    this.store.dispatch(AuthStateActions.AUTH_DATA_CHARACTER_UPDATED({ characterName, avatarURL }));
  }
}
