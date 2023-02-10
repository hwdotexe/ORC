import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { PageFolder } from 'src/app/models/page-folder.interface';
import { Page } from 'src/app/models/page.interface';
import { PagesStateActions } from './pages-state.actions';
import { PagesStateSelectors } from './pages-state.selectors';

@Injectable({
  providedIn: 'root'
})
export class PagesStateService {
  pages$: Observable<Page[]> = this.store.select(PagesStateSelectors.pages);
  pageFolders$: Observable<PageFolder[]> = this.store.select(PagesStateSelectors.pageFolders);

  constructor(private store: Store) {}

  isPageFolderListLoaded$(): Observable<boolean> {
    return this.pageFolders$.pipe(
      take(1),
      map(data => {
        if (!data) {
          this.onPageFolderListRequest();
        }

        return true;
      })
    );
  }

  getPage(pageID: string): Observable<Page> {
    return this.pages$.pipe(map(pages => pages.find(c => c.pageID === pageID)));
  }

  // TODO: This does not return the PageFolderData object.
  getPageFolder(pageFolderID: string): Observable<PageFolder> {
    return this.pageFolders$.pipe(map(folder => folder.find(c => c.folderID === pageFolderID)));
  }

  onPageFolderListRequest(): void {
    this.store.dispatch(PagesStateActions.pageFoldersListRequest());
  }

  onPageFolderDataRequest(folderID: string): void {
    this.store.dispatch(PagesStateActions.pageFoldersDataRequest({ folderID }));
  }

  onPageDataCleared() {
    this.store.dispatch(PagesStateActions.pagesDataCleared());
  }
}
