import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { PageCreateRequest } from 'src/app/models/API/Request/page-create-request.interface';
import { SharePrivacy } from 'src/app/models/enum/share-privacy.enum';
import { PageFolder } from 'src/app/models/page-folder.interface';
import { Page } from 'src/app/models/page.interface';
import { PageLoadingService } from 'src/app/services/page-loading-service/page-loading.service';
import { AppDetailsStateService } from 'src/app/store/app-details-state/app-details-state.service';
import { PagesStateService } from 'src/app/store/pages-state/pages-state.service';

@Component({
  selector: 'app-page-folder-view',
  templateUrl: './page-folder-view.component.html',
  styleUrls: ['./page-folder-view.component.css']
})
export class PageFolderViewComponent implements OnInit {
  pages$: Observable<Page[]>;
  pageFolder$: Observable<PageFolder>;
  isDataLoaded$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  displayPage$: Observable<Page>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appDetailsStateService: AppDetailsStateService,
    private pagesStateService: PagesStateService,
    private pageLoadingService: PageLoadingService
  ) {}

  ngOnInit(): void {
    this.pageFolder$ = this.activatedRoute.queryParamMap.pipe(
      switchMap(map => (map.has('pageFolder') ? this.pagesStateService.getPageFolderFromID$(map.get('pageFolder')) : of(null)))
    );

    this.displayPage$ = this.activatedRoute.queryParamMap.pipe(
      switchMap(map => (map.has('page') ? this.pagesStateService.getPageFromID$(map.get('page')) : of(null)))
    );

    this.pages$ = this.pagesStateService.pages$;
    this.isDataLoaded$ = this.pageFolder$.pipe(switchMap(folder => this.pagesStateService.isPageDataLoaded$(folder)));
    this.isLoading$ = this.pageLoadingService.showLoadingIcon$;
  }

  dispatchCreatePage(folderID: string): void {
    let request: PageCreateRequest = {
      title: 'New Page',
      privacy: SharePrivacy.PRIVATE,
      folderID
    };

    this.pagesStateService.onPageCreateRequest(request);
  }

  deleteFolder(folder: PageFolder): void {
    this.appDetailsStateService.showConfirmationModal({
      title: 'Are you sure?',
      body: [
        'You are about to delete the folder "' + folder.folderName + '"!',
        'This will also delete each page inside this folder, and users sharing this folder will lose access.',
        'This action cannot be undone.'
      ],
      callback: () => {
        this.pagesStateService.onPageFolderDeleteRequest(folder.folderID);
      }
    });
  }
}
