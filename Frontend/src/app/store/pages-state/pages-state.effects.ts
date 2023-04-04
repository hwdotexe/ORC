import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { PageFolderDataResponse } from 'src/app/models/API/Response/page-folder-data-response.interface';
import { PageFoldersListResponse } from 'src/app/models/API/Response/page-folders-list-response.interface';
import { Page } from 'src/app/models/page.interface';
import { HTTPService } from 'src/app/services/httpservice/http.service';
import { PagesStateActions } from './pages-state.actions';

@Injectable()
export class PagesStateEffects {
  constructor(private actions$: Actions, private httpService: HTTPService, private router: Router) {}

  pageFolderListRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PagesStateActions.pageFoldersListRequest),
      mergeMap(() =>
        this.httpService.GET<PageFoldersListResponse>('page', 'LIST_PAGE_FOLDERS').pipe(
          map(response => PagesStateActions.pageFoldersListReceived({ response: response.body })),
          catchError(error => of(PagesStateActions.pagesDataFailure({ error })))
        )
      )
    )
  );

  pageFolderDataRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PagesStateActions.pageFoldersDataRequest),
      mergeMap(request =>
        this.httpService.GET<PageFolderDataResponse>('page/folder/' + request.folderID, 'GET_PAGE_FOLDER').pipe(
          map(response => PagesStateActions.pageFoldersDataReceived({ response: response.body })),
          catchError(error => of(PagesStateActions.pagesDataFailure({ error })))
        )
      )
    )
  );

  pageFolderCreateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PagesStateActions.pageFolderCreateRequest),
      mergeMap(action =>
        this.httpService.PUT<any>('page/folder/', action.request, 'CREATE_PAGE_FOLDER').pipe(
          map(response => PagesStateActions.pageFolderCreateReceived({ response: response.body })),
          catchError(error => of(PagesStateActions.pagesDataFailure({ error })))
        )
      )
    )
  );

  pageFolderCreateReceived$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PagesStateActions.pageFolderCreateReceived),
        tap(action => this.router.navigate(['/dashboard'], { queryParams: { pageFolder: action.response.folderID } }))
      ),
    { dispatch: false }
  );

  pageEditRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PagesStateActions.pageUpdateRequest),
      exhaustMap(action =>
        this.httpService.PATCH<Page>('page', action.request, 'UPDATE_PAGE').pipe(
          map(response => PagesStateActions.pageUpdateReceived({ response: response.body })),
          catchError(error => of(PagesStateActions.pagesDataFailure({ error })))
        )
      )
    )
  );

  // TODO catch the failure and display something
}
