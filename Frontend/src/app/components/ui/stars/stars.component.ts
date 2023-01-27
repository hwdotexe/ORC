import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  @Input() rating: number;

  constructor() { }

  ngOnInit(): void {}

  getFullStars(): number {
    return Math.floor(this.rating);
  }

  hasHalfStar(): boolean {
    return this.rating % 1 != 0;
  }
}
