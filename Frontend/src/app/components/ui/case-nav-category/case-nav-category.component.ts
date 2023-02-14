import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-case-nav-category',
  templateUrl: './case-nav-category.component.html',
  styleUrls: ['./case-nav-category.component.css']
})
export class CaseNavCategoryComponent implements OnInit {
  @Input() label: string = 'Default Label';
  @Input() fa_icon: string = 'fa-regular fa-circle-question';

  expanded: boolean;

  constructor() {}

  ngOnInit(): void {
    this.expanded = false;
  }

  toggleExpand(): void {
    this.expanded = !this.expanded;
  }
}
