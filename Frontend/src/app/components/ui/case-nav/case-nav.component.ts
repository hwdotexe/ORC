import { Component, OnInit } from '@angular/core';
import { filter, Observable, switchMap } from 'rxjs';
import { Campaign } from 'src/app/models/campaign.interface';
import { PageFolder } from 'src/app/models/page-folder.interface';
import { CampaignStateService } from 'src/app/store/campaigns-state/campaigns-state.service';
import { PagesStateService } from 'src/app/store/pages-state/pages-state.service';

@Component({
  selector: 'app-case-nav',
  templateUrl: './case-nav.component.html',
  styleUrls: ['./case-nav.component.css']
})
export class CaseNavComponent implements OnInit {
  campaigns$: Observable<Campaign[]>;
  pageFolders$: Observable<PageFolder[]>;

  showCampaigns: boolean;
  showCharacters: boolean;
  showSystems: boolean;
  showNotes: boolean;

  constructor(private campaignStateService: CampaignStateService, private pagesStateService: PagesStateService) {}

  ngOnInit(): void {
    this.showCampaigns = false;
    this.showCharacters = false;
    this.showSystems = false;

    this.campaigns$ = this.campaignStateService.isCampaignDataLoaded$().pipe(
      filter(loaded => loaded),
      switchMap(() => this.campaignStateService.campaigns$)
    );

    this.pageFolders$ = this.pagesStateService.isPageFolderListLoaded$().pipe(
      filter(loaded => loaded),
      switchMap(() => this.pagesStateService.pageFolders$)
    );
  }

  showCampaignsSection() {
    this.hideAllMenus();
    this.showCampaigns = true;
  }

  showCharactersSection() {
    this.hideAllMenus();
    this.showCharacters = true;
  }

  showSystemsSection() {
    this.hideAllMenus();
    this.showSystems = true;
  }

  showNotesSection() {
    this.hideAllMenus();
    this.showNotes = true;
  }

  hideAllMenus() {
    this.showCampaigns = false;
    this.showCharacters = false;
    this.showSystems = false;
    this.showNotes = false;
  }
}
