import { AuthState } from './auth-state.interface';

export const authInitialState: AuthState = {
  authToken: undefined,
  userID: undefined,
  userAvatarURL: undefined,
  userName: undefined,
  userServer: undefined,
  accountType: undefined,
};
