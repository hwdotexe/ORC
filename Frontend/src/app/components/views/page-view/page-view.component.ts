import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs';
import { SharePrivacy } from 'src/app/models/enum/share-privacy.enum';
import { Page } from 'src/app/models/page.interface';
import { AppDetailsStateService } from 'src/app/store/app-details-state/app-details-state.service';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private pagesStateService: PagesStateService,
    private appDetailsStateService: AppDetailsStateService
  ) {
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
    this.appDetailsStateService.showConfirmationModal({
      title: 'Are you sure?',
      body: ['You are about to delete the page "' + this.page.title + '"!', 'This action cannot be undone.'],
      callback: () => {
        this.pagesStateService.onPageDeleteRequest(this.page.pageID);
      }
    });
  }
}
