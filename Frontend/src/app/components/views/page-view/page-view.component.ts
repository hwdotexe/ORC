import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs';
import { Page } from 'src/app/models/page.interface';
import { BaseUnsubscribeComponent } from '../../base-unsubscribe.component';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.css']
})
export class PageViewComponent extends BaseUnsubscribeComponent implements OnInit {
  @Input() page: Page;
  @Input() isEditing = false;

  constructor(private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.activatedRoute.queryParamMap
      .pipe(
        filter(map => map.has('isEditing')),
        map(map => map.get('isEditing')),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(isEditing => {
        if (isEditing) {
          this.isEditing = true;
        }
      });
  }

  startEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }
}
