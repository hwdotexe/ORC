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

  getPageFolderFromID$(folderID: string): Observable<PageFolder> {
    // TODO: call action to navigate to Not Found?
    return this.pageFolders$.pipe(map(folders => folders?.find(f => f.folderID == folderID)));
  }

  isPageDataLoaded$(folder: PageFolder): Observable<boolean> {
    return this.pages$.pipe(
      take(1),
      map(data => {
        // Check that the IDs in folder match IDs in pages. If no match, get data.
        if (!data || !this.folderMatchState(data, folder)) {
          this.onPageFolderDataRequest(folder.folderID);
        }

        return true;
      })
    );
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

  private folderMatchState(statePages: Page[], folder: PageFolder) {
    // If there are pages to compare at all, compare them. Otherwise, only compare the length.
    if (folder.pages.length > 0) {
      // If the folder count is different than state, we don't have a match.
      if (folder.pages.length !== statePages.length) {
        return false;
      }

      // Counts are equal, so we have some IDs to check.
      var match = true;

      for (var page of statePages) {
        if (!folder.pages.includes(page.pageID)) {
          match = false;
          break;
        }
      }

      return match;
    } else {
      return statePages.length === folder.pages.length;
    }
  }
}
