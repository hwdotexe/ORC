import { createReducer, on } from '@ngrx/store';
import { campaignsInitialState } from './campaigns-initial-state';
import { CampaignStateActions } from './campaigns-state.actions';
import { CampaignsState } from './campaigns-state.interface';

const reducer = createReducer(
  campaignsInitialState,
  on(
    CampaignStateActions.campaignDataReceived,
    (state, action): CampaignsState => ({
      ...state,
      campaigns: action.response
    })
  ),
  on(CampaignStateActions.campaignDataCleared, (state, action): CampaignsState => campaignsInitialState)
);

export function campaignStateReducer(state, action) {
  return reducer(state, action);
}
