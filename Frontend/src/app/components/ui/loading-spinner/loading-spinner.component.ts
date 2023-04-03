import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {
  readonly loadingMessages = ["Raiding the dragon's loot", 'Casting Identify', 'Rolling hit dice', 'Asking the guards'];

  displayMessage: string;

  constructor() {}

  ngOnInit(): void {
    this.displayMessage = this.loadingMessages[Math.floor(Math.random() * this.loadingMessages.length)] + '...';
  }
}
