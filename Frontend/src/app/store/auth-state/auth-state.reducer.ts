import { createReducer, on } from '@ngrx/store';
import { authInitialState } from './auth-initial-state';
import { AuthStateActions } from './auth-state.actions';
import { AuthState } from './auth-state.interface';

const reducer = createReducer(
  authInitialState,
  on(
    AuthStateActions.registerSuccess,
    (state, action): AuthState => ({
      ...state,
      authToken: action.response.authToken,
      accountID: action.response.accountID,
      displayName: action.response.displayName,
      accountType: action.response.accountType
    })
  ),
  on(
    AuthStateActions.loginSuccess,
    (state, action): AuthState => ({
      ...state,
      authToken: action.response.authToken,
      accountID: action.response.accountID,
      displayName: action.response.displayName,
      accountType: action.response.accountType
    })
  ),
  on(AuthStateActions.logOutSuccess, (state, action): AuthState => authInitialState),
  on(AuthStateActions.authDataCleared, (state, action): AuthState => authInitialState),
  on(
    AuthStateActions.AUTH_DATA_INFO_UPDATED,
    (state, action): AuthState => ({
      ...state,
      displayName: action.displayName
    })
  )
);

export function authStateReducer(state, action) {
  return reducer(state, action);
}
