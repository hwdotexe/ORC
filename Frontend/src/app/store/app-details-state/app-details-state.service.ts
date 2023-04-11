import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter, withLatestFrom } from 'rxjs';
import { FormError } from 'src/app/models/form-validation-error.interface';
import { AppDetailsStateActions } from './app-details-state.actions';

@Injectable({
  providedIn: 'root'
})
export class AppDetailsStateService {
  formErrors$: BehaviorSubject<FormError[]> = new BehaviorSubject([]);

  constructor(private store: Store, private router: Router) {
    this.watchPageNavigation();
  }

  onServerError(error: any): void {
    this.store.dispatch(AppDetailsStateActions.serverError({ error }));
  }

  onFormError(error: FormError) {
    this.store.dispatch(AppDetailsStateActions.formError({ error }));
  }

  onFormErrorsCleared() {
    this.store.dispatch(AppDetailsStateActions.formErrorsCleared());
  }

  onHeartbeat(): void {
    this.store.dispatch(AppDetailsStateActions.authenticationHeartbeatAttempt());
  }

  private watchPageNavigation(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        withLatestFrom(this.formErrors$)
      )
      .subscribe(([, formErrors]) => {
        if (formErrors?.length > 0) {
          this.onFormErrorsCleared();
        }
      });
  }

  // List of errors and forms
  // Means to clear the errors
  // Selectors
}
