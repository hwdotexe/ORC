import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateActions } from './app-state.actions';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  constructor(private store: Store) {}

  onServerError(error: any): void {
    this.store.dispatch(AppStateActions.serverError({ error }));
  }
}
