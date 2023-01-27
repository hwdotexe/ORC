import { createReducer, on } from '@ngrx/store';
import { authInitialState } from './auth-initial-state';
import { AuthState } from './auth-state.interface';
import { AuthStateActions } from './auth-state.actions';

const reducer = createReducer(
  authInitialState,
  on(
    AuthStateActions.AUTH_DATA_RECEIVED,
    (state, action): AuthState => ({
      ...state,
      authToken: action.authToken,
      userID: action.userid,
      userAvatarURL: action.userAvatarURL,
      userName: action.userName,
      userServer: action.userServer,
      accountType: action.accountType
    })
  ),
  on(AuthStateActions.AUTH_DATA_CLEARED, (state, action): AuthState => authInitialState),
  on(
    AuthStateActions.AUTH_DATA_CHARACTER_UPDATED,
    (state, action): AuthState => ({
      ...state,
      userAvatarURL: action.avatarURL,
      userName: action.characterName
    })
  )
);

export function authStateReducer(state, action) {
  return reducer(state, action);
}
