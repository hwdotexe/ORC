import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, of, tap } from 'rxjs';
import { AccountAuthenticatedResponse } from 'src/app/models/API/Response/account-authenticated-response.interface';
import { HTTPService } from 'src/app/services/httpservice/http.service';
import { AuthStateActions } from './auth-state.actions';

@Injectable()
export class AuthStateEffects {
  constructor(private actions$: Actions, private httpService: HTTPService, private router: Router) {}

  loginAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.loginAttempt),
      mergeMap(action =>
        this.httpService.POST<AccountAuthenticatedResponse>('user', action.request, 'LOGIN').pipe(
          map(response => AuthStateActions.loginSuccess({ response: response.responseBody })),
          catchError(error => of(AuthStateActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthStateActions.loginSuccess),
        tap(() => this.router.navigate(['/']))
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
          catchError(() => EMPTY)
        )
      )
    )
  );

  logOutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthStateActions.logOutSuccess),
        tap(() => this.router.navigate(['']))
      ),
    { dispatch: false }
  );
}
