import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { Campaign } from 'src/app/models/campaign.interface';
import { CampaignStateService } from 'src/app/store/campaigns-state/campaigns-state.service';

@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.css']
})
export class CampaignViewComponent implements OnInit {
  campaign$: Observable<Campaign>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private campaignStateService: CampaignStateService) {}

  ngOnInit(): void {
    this.campaign$ = this.activatedRoute.queryParamMap.pipe(
      filter(map => map.has('campaign')),
      switchMap(map => this.campaignStateService.getCampaign(map.get('campaign'))),
      tap(campaign => {
        if (!campaign) {
          // TODO call an action to perform the navigation instead.
          this.router.navigate(['/not-found']);
        }
      })
    );
  }
}
