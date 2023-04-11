import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs';
import { SharePrivacy } from 'src/app/models/enum/share-privacy.enum';
import { Page } from 'src/app/models/page.interface';
import { PagesStateService } from 'src/app/store/pages-state/pages-state.service';
import { BaseUnsubscribeComponent } from '../../base-unsubscribe.component';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.css']
})
export class PageViewComponent extends BaseUnsubscribeComponent implements OnInit {
  @Input() page: Page;
  @Input() isEditing = false;

  SharePrivacy = SharePrivacy;

  constructor(private activatedRoute: ActivatedRoute, private pagesStateService: PagesStateService) {
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

  deletePage(): void {
    // TODO show an ARE YOU SURE? message/modal!
    this.pagesStateService.onPageDeleteRequest(this.page.pageID);
  }
}
