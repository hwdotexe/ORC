import { AuthState } from './auth-state/auth-state.interface';
import { CampaignsState } from './campaigns-state/campaigns-state.interface';
import { PagesState } from './pages-state/pages-state.interface';

export interface AppState {
  authState: AuthState;
  campaignState: CampaignsState;
  pagesState: PagesState;
}
