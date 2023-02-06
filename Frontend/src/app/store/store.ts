import { authStateReducer } from './auth-state/auth-state.reducer';
import { campaignStateReducer } from './campaigns-state/campaigns-state.reducer';

export const rootReducer = {
  authState: authStateReducer,
  campaignState: campaignStateReducer
};
