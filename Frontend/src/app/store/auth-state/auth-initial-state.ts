import { AuthState } from './auth-state.interface';

export const authInitialState: AuthState = {
  authToken: undefined,
  userID: undefined,
  displayName: undefined,
  accountType: undefined
};
