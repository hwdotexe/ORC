import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { PageFolderDataResponse } from 'src/app/models/API/Response/page-folder-data-response.interface';
import { HTTPService } from 'src/app/services/httpservice/http.service';
import { AuthStateActions } from '../auth-state/auth-state.actions';
import { AuthStateService } from '../auth-state/auth-state.service';
import { CampaignStateActions } from '../campaigns-state/campaigns-state.actions';
import { PagesStateActions } from '../pages-state/pages-state.actions';
import { AppDetailsStateActions } from './app-details-state.actions';
import { AppDetailsStateService } from './app-details-state.service';

@Injectable()
export class AppDetailsStateEffects {
  constructor(
    private actions$: Actions,
    private appDetailsStateService: AppDetailsStateService,
    private httpService: HTTPService,
    private authStateService: AuthStateService,
    private router: Router
  ) {}

  serverErrorReceived$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppDetailsStateActions.serverError),
        tap(() => {
          this.router.navigate(['/error']);
        })
      ),
    { dispatch: false }
  );

  formErrorFound$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppDetailsStateActions.formError),
        withLatestFrom(this.appDetailsStateService.formErrors$),
        tap(([error, formErrors]) => {
          this.appDetailsStateService.formErrors$.next([...formErrors, error.error]);
        })
      ),
    { dispatch: false }
  );

  formErrorsCleared$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppDetailsStateActions.formErrorsCleared),
        tap(() => {
          this.appDetailsStateService.formErrors$.next([]);
        })
      ),
    { dispatch: false }
  );

  stateCleared$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppDetailsStateActions.clearFullState),
      mergeMap(() => [CampaignStateActions.campaignDataCleared(), PagesStateActions.pagesDataCleared()])
    )
  );

  authHeartbeat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppDetailsStateActions.authenticationHeartbeatAttempt),
      mergeMap(() =>
        this.httpService.GET<PageFolderDataResponse>('heartbeat', 'CREATE_PAGE').pipe(
          map(() => {
            return AppDetailsStateActions.authenticationHeartbeatSucceeded();
          }),
          catchError(error => of(AuthStateActions.authExpired(error)))
        )
      )
    )
  );
}
