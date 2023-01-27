import { AppState } from '../app-state.interface';

export abstract class AuthStateSelectors {
  static readonly authToken = (state: AppState) => state.authState.authToken;
  static readonly userID = (state: AppState) => state.authState.userID;
  static readonly userAvatarURL = (state: AppState) => state.authState.userAvatarURL;
  static readonly userName = (state: AppState) => state.authState.userName;
  static readonly userServer = (state: AppState) => state.authState.userServer;
  static readonly accountType = (state: AppState) => state.authState.accountType;
}
