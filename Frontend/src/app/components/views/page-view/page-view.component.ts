import { Component, Input, OnInit } from '@angular/core';
import { Page } from 'src/app/models/page.interface';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.css']
})
export class PageViewComponent implements OnInit {
  @Input() page: Page;
  @Input() isEditing = false;

  constructor() {}

  ngOnInit(): void {}

  startEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }
}
