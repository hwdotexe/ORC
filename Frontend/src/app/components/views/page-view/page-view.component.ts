import { Component, Input, OnInit } from '@angular/core';
import { Page } from 'src/app/models/page.interface';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.css']
})
export class PageViewComponent implements OnInit {
  @Input() page: Page;

  isEditing: boolean;

  constructor() {}

  ngOnInit(): void {
    this.isEditing = false;
  }

  startEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }
}
