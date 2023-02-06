import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { HTTPService } from 'src/app/services/httpservice/http.service';
import { AppStateActions } from './app-state.actions';

@Injectable()
export class AppStateEffects {
  constructor(private actions$: Actions, private httpService: HTTPService, private router: Router) {}

  serverErrorReceived$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppStateActions.serverError),
        tap(error => {
          console.log(error);
          // TODO display notification?
          this.router.navigate(['/error']);
        })
      ),
    { dispatch: false }
  );
}
