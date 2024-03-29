import { AppState } from '../app-state.interface';

export abstract class AuthStateSelectors {
  static readonly authToken = (state: AppState) => state.authState.authToken;
  static readonly userID = (state: AppState) => state.authState.accountID;
  static readonly avatarURL = (state: AppState) => state.authState.avatarURL;
  static readonly displayName = (state: AppState) => state.authState.displayName;
  static readonly accountType = (state: AppState) => state.authState.accountType;
}
