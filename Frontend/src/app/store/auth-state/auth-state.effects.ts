import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { AccountAuthenticatedResponse } from 'src/app/models/API/Response/account-authenticated-response.interface';
import { HTTPService } from 'src/app/services/httpservice/http.service';
import { AppStateActions } from '../app-state/app-state.actions';
import { CampaignStateActions } from '../campaigns-state/campaigns-state.actions';
import { AuthStateActions } from './auth-state.actions';

@Injectable()
export class AuthStateEffects {
  constructor(private actions$: Actions, private httpService: HTTPService, private router: Router) {}

  registerAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.registerAttempt),
      mergeMap(action =>
        this.httpService.PUT<AccountAuthenticatedResponse>('account', action.request, 'REGISTER_ACCOUNT').pipe(
          map(response => AuthStateActions.registerSuccess({ response: response.body })),
          catchError(error => of(AuthStateActions.authFailure({ error })))
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthStateActions.registerSuccess),
        tap(() => this.router.navigate(['/dashboard']))
      ),
    { dispatch: false }
  );

  loginAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.loginAttempt),
      exhaustMap(action =>
        this.httpService.POST<AccountAuthenticatedResponse>('account', action.request, 'LOGIN').pipe(
          map(response => AuthStateActions.loginSuccess({ response: response.body })),
          catchError(error => of(AuthStateActions.authFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthStateActions.loginSuccess),
        tap(() => this.router.navigate(['/dashboard']))
      ),
    { dispatch: false }
  );

  // TODO with an error state or error field within state, we can have a global component that displays toast errors when login is invalid.

  logOutAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.logOutAttempt),
      mergeMap(() =>
        this.httpService.POST<any>('logout', {}, 'LOGOUT').pipe(
          map(() => AuthStateActions.logOutSuccess()),
          catchError(error => of(AppStateActions.serverError({ error }), AuthStateActions.authDataCleared()))
        )
      )
    )
  );

  logOutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.logOutSuccess),
      map(() => CampaignStateActions.campaignDataCleared()),
      tap(() => this.router.navigate(['/logged-out']))
    )
  );
}
