import { createReducer, on } from '@ngrx/store';
import { authInitialState } from './auth-initial-state';
import { AuthState } from './auth-state.interface';
import { AuthStateActions } from './auth-state.actions';

const reducer = createReducer(
  authInitialState,
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
  on(AuthStateActions.AUTH_DATA_CLEARED, (state, action): AuthState => authInitialState),
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
