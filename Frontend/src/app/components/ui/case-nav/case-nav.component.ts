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

  showCampaigns: boolean;
  showCharacters: boolean;
  showSystems: boolean;

  constructor(private campaignStateService: CampaignStateService) {}

  ngOnInit(): void {
    this.showCampaigns = false;
    this.showCharacters = false;
    this.showSystems = false;

    this.campaigns$ = this.campaignStateService.isCampaignDataLoaded$().pipe(
      filter(loaded => loaded),
      switchMap(() => this.campaignStateService.campaigns$)
    );
  }

  showCampaignsSection() {
    this.showCampaigns = true;
    this.showCharacters = false;
    this.showSystems = false;
  }

  showCharactersSection() {
    this.showCampaigns = false;
    this.showCharacters = true;
    this.showSystems = false;
  }

  showSystemsSection() {
    this.showCampaigns = false;
    this.showCharacters = false;
    this.showSystems = true;
  }

  hideAllMenus() {
    this.showCampaigns = false;
    this.showCharacters = false;
    this.showSystems = false;
  }
}
