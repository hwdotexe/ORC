import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Report } from 'src/app/models/API/report.interface';
import { Review } from 'src/app/models/API/review.interface';
import { ReportsStateActions } from './reports-state.actions';
import { ReportsStateSelectors } from './reviews-state.selectors';

@Injectable({
  providedIn: 'root'
})
export class ReportsStateService {
  reports$: Observable<Report[]> = this.store.select(ReportsStateSelectors.reports);

  constructor(private store: Store) {}

  onReportsDataReceived(reports: Report[]): void {
    this.store.dispatch(ReportsStateActions.REPORTS_DATA_RECEIVED({ reports }));
  }

  onReportsDataCleared(): void {
    this.store.dispatch(ReportsStateActions.REPORTS_DATA_CLEARED());
  }
}
