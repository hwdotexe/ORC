import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store/src/models';
import { ToastrService } from 'ngx-toastr';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { AccountAuthenticatedResponse } from 'src/app/models/API/Response/account-authenticated-response.interface';
import { FormName } from 'src/app/models/enum/form-name.enum';
import { FormError } from 'src/app/models/form-validation-error.interface';
import { HTTPService } from 'src/app/services/httpservice/http.service';
import { AppDetailsStateActions } from '../app-details-state/app-details-state.actions';
import { AuthStateActions } from './auth-state.actions';

@Injectable()
export class AuthStateEffects {
  constructor(private actions$: Actions, private httpService: HTTPService, private router: Router, private toastrService: ToastrService) {}

  registerAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.registerAttempt),
      mergeMap(action =>
        this.httpService.PUT<AccountAuthenticatedResponse>('account', action.request, 'REGISTER_ACCOUNT').pipe(
          map(response => AuthStateActions.registerSuccess({ response: response.body })),
          catchError(error => of(this.handleError(error, AuthStateActions.authFailure({ form: FormName.REGISTER_ACCOUNT, error }))))
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthStateActions.registerSuccess),
        tap(() => {
          this.router.navigate(['/app/dashboard']);
          this.toastrService.success('Your account is ready for adventure.', 'Welcome to CritCase!');
        })
      ),
    { dispatch: false }
  );

  loginAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.loginAttempt),
      exhaustMap(action =>
        this.httpService.POST<AccountAuthenticatedResponse>('account', action.request, 'LOGIN').pipe(
          map(response => AuthStateActions.loginSuccess({ response: response.body })),
          catchError(error => of(this.handleError(error, AuthStateActions.authFailure({ form: FormName.LOG_IN, error }))))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthStateActions.loginSuccess),
        tap(() => {
          this.router.navigate(['/app/dashboard']);
          this.toastrService.success("You've successfully logged in.", 'Welcome back!');
        })
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
          catchError(error => of(this.handleError(error), AuthStateActions.logOutSuccess()))
        )
      )
    )
  );

  logOutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.logOutSuccess),
      map(() => AppDetailsStateActions.clearFullState()),
      tap(() => {
        this.router.navigate(['/logged-out']);
        this.toastrService.success("You've been successfully logged out.", 'Logged out!');
      })
    )
  );

  authFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.authFailure),
      map(payload => AppDetailsStateActions.formError({ error: this.mapAuthFailure(payload.form, payload.error) }))
    )
  );

  authExpired$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.authExpired),
      tap(() => this.router.navigate(['/timed-out'])),
      map(() => AppDetailsStateActions.clearFullState())
    )
  );

  private handleError(error: HttpErrorResponse, action?: Action) {
    if (error.status >= 500) {
      return AppDetailsStateActions.serverError({ error });
    } else {
      return action;
    }
  }

  private mapAuthFailure(form: FormName, error: HttpErrorResponse): FormError {
    switch (error.status) {
      case 400:
        return {
          form,
          error: 'There was an error processing your request. Please check your data and try again.'
        };
      case 401: {
        return {
          form,
          error: 'Your email or password was incorrect.'
        };
      }
      case 409: {
        return {
          form,
          error: 'An account with that email address already exists.'
        };
      }
      default:
        return {
          form,
          error: 'There was an error with your request. Please try again.'
        };
    }
  }
}
