import { Component, Input, OnInit } from '@angular/core';
import { SharePrivacy } from 'src/app/models/enum/share-privacy.enum';
import { Page } from 'src/app/models/page.interface';

@Component({
  selector: 'ui-page-item',
  templateUrl: './page-item.component.html',
  styleUrls: ['./page-item.component.css']
})
export class PageItemComponent implements OnInit {
  @Input() page: Page;

  SharePrivacy = SharePrivacy;

  constructor() {}

  ngOnInit(): void {}
}
