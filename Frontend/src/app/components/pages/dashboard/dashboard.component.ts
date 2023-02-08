import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/campaign.interface';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  makeSelection: boolean;
  displayedCampaign: Campaign;

  constructor() {}

  ngOnInit(): void {
    this.makeSelection = true;
  }

  displayCampaign(campaign: Campaign) {
    this.makeSelection = false;
    this.displayedCampaign = campaign;
    // Destroy other types
  }
}
