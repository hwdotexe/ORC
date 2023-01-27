import { Component, OnInit } from '@angular/core';
import { BaseUnsubscribeComponent } from '../../base-unsubscribe.component';

@Component({
  selector: 'app-compose',
  templateUrl: './compose-review.component.html',
  styleUrls: ['./compose-review.component.css']
})
export class ComposeComponent extends BaseUnsubscribeComponent implements OnInit {
  constructor() {
    super(); 
  }

  ngOnInit(): void {
  }
}
