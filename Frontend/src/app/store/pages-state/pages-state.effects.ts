import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { PageFoldersListResponse } from 'src/app/models/API/Response/page-folders-list-response.interface';
import { HTTPService } from 'src/app/services/httpservice/http.service';
import { PagesStateActions } from './pages-state.actions';

@Injectable()
export class PagesStateEffects {
  constructor(private actions$: Actions, private httpService: HTTPService, private router: Router) {}

  pageFolderDataRequest$ = createEffect(() =>
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

  // TODO catch the failure and display something
}
