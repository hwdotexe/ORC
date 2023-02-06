import { AppState } from '../app-state.interface';

export abstract class CampaignStateSelectors {
  static readonly campaigns = (state: AppState) => state.campaignState.campaigns;
}
