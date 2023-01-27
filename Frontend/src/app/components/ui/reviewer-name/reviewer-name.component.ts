import { Component, Input, OnInit } from '@angular/core';
import { AccountType } from 'src/app/models/enum/account-type.enum';

@Component({
  selector: 'app-reviewer-name',
  templateUrl: './reviewer-name.component.html',
  styleUrls: ['./reviewer-name.component.css'],
})
export class ReviewerNameComponent implements OnInit {
  @Input() accountType: AccountType;
  cssClass: string;

  constructor() {}

  ngOnInit(): void {
    switch (this.accountType) {
      case AccountType.ADMIN:
        this.cssClass = 'text-red-600 border-red-600';
        break;
      case AccountType.MODERATOR:
        this.cssClass = 'text-sky-700 border-sky-700';
        break;
      case AccountType.GUEST:
        this.cssClass = 'text-green-700 border-green-700';
        break;
      default:
        this.cssClass = 'text-gray-700 border-gray-700';
    }
  }
}
