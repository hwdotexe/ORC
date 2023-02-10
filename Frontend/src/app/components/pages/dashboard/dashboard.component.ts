import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  makeSelection: boolean;

  constructor() {}

  ngOnInit(): void {
    this.makeSelection = true;
  }
}
