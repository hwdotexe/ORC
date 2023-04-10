import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, map, switchMap } from 'rxjs';
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
  queryParamID$: Observable<string>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private campaignStateService: CampaignStateService,
    private pagesStateService: PagesStateService
  ) {}

  ngOnInit(): void {
    this.campaigns$ = this.campaignStateService.isCampaignDataLoaded$().pipe(
      filter(loaded => loaded),
      switchMap(() => this.campaignStateService.campaigns$)
    );

    this.pageFolders$ = this.pagesStateService.isPageFolderListLoaded$().pipe(
      filter(loaded => loaded),
      switchMap(() => this.pagesStateService.pageFolders$)
    );

    // We can amend this with future query param keys to make this apply to multiple types.
    this.queryParamID$ = this.activatedRoute.queryParamMap.pipe(map(map => (map.has('pageFolder') ? map.get('pageFolder') : 'none')));
  }

  dispatchCreateFolder(title: string) {
    this.pagesStateService.onPageFolderCreateRequest(title);
  }
}
