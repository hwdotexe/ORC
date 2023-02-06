import { createAction, props } from '@ngrx/store';
import { CampaignListResponse } from 'src/app/models/API/Response/campaign-list-response.interface';

export abstract class CampaignStateActions {
  static readonly campaignDataRequest = createAction('@critcase/action/campaign/request');
  static readonly campaignDataReceived = createAction('@critcase/action/campaign/received', props<{ response: CampaignListResponse }>());
  static readonly campaignDataFailure = createAction('@critcase/action/campaign/failure', props<{ error: any }>());
  static readonly campaignDataCleared = createAction('@critcase/action/campaign/cleared');
}
