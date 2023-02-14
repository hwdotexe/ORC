import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Campaign } from 'src/app/models/campaign.interface';
import { CampaignStateService } from 'src/app/store/campaigns-state/campaigns-state.service';

@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.css']
})
export class CampaignViewComponent implements OnInit {
  campaign$: Observable<Campaign>;

  constructor(private activatedRoute: ActivatedRoute, private campaignStateService: CampaignStateService) {}

  ngOnInit(): void {
    this.campaign$ = this.activatedRoute.queryParamMap.pipe(
      switchMap(map => (map.has('campaign') ? this.campaignStateService.getCampaign(map.get('campaign')) : of(null)))
    );
  }
}
