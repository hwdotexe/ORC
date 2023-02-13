import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, tap, withLatestFrom } from 'rxjs';
import { CampaignStateActions } from '../campaigns-state/campaigns-state.actions';
import { PagesStateActions } from '../pages-state/pages-state.actions';
import { AppDetailsStateActions } from './app-details-state.actions';
import { AppDetailsStateService } from './app-details-state.service';

@Injectable()
export class AppDetailsStateEffects {
  constructor(private actions$: Actions, private appDetailsStateService: AppDetailsStateService, private router: Router) {}

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
}
