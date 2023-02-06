import { Component, OnInit } from '@angular/core';
import { filter, Observable, switchMap } from 'rxjs';
import { Campaign } from 'src/app/models/campaign.interface';
import { CampaignStateService } from 'src/app/store/campaigns-state/campaigns-state.service';

@Component({
  selector: 'app-case-nav',
  templateUrl: './case-nav.component.html',
  styleUrls: ['./case-nav.component.css']
})
export class CaseNavComponent implements OnInit {
  campaigns$: Observable<Campaign[]>;

  isRootLevel: boolean;

  constructor(private campaignStateService: CampaignStateService) {}

  ngOnInit(): void {
    this.isRootLevel = true;

    this.campaigns$ = this.campaignStateService.isCampaignDataLoaded$().pipe(
      filter(loaded => loaded),
      switchMap(() => this.campaignStateService.campaigns$)
    );
  }

  loadSubLevel(): void {
    this.isRootLevel = false;
  }

  loadRootLevel(): void {
    this.isRootLevel = true;
  }
}
