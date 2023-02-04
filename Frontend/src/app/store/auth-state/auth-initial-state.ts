import { AuthState } from './auth-state.interface';

export const authInitialState: AuthState = {
  authToken: undefined,
  accountID: undefined,
  displayName: undefined,
  accountType: undefined
};
