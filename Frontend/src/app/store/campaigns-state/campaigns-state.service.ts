import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { Campaign } from 'src/app/models/campaign.interface';
import { CampaignStateActions } from './campaigns-state.actions';
import { CampaignStateSelectors } from './campaigns-state.selectors';

@Injectable({
  providedIn: 'root'
})
export class CampaignStateService {
  campaigns$: Observable<Campaign[]> = this.store.select(CampaignStateSelectors.campaigns);

  constructor(private store: Store) {}

  isCampaignDataLoaded$(): Observable<boolean> {
    return this.campaigns$.pipe(
      take(1),
      map(data => {
        if (!data) {
          this.onCampaignDataRequest();
        }

        return true;
      })
    );
  }

  getCampaign(campaignID: string): Observable<Campaign> {
    return this.campaigns$.pipe(map(campaigns => campaigns.find(c => c.campaignID === campaignID)));
  }

  onCampaignDataRequest(): void {
    this.store.dispatch(CampaignStateActions.campaignDataRequest());
  }

  onCampaignDataCleared() {
    this.store.dispatch(CampaignStateActions.campaignDataCleared());
  }
}
