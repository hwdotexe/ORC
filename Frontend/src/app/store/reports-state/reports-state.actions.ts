import { createAction, props } from '@ngrx/store';
import { Report } from 'src/app/models/API/report.interface';

export abstract class ReportsStateActions {
  static readonly REPORTS_DATA_RECEIVED = createAction('REPORTS_DATA_RECEIVED', props<{ reports: Report[] }>());
  static readonly REPORTS_DATA_CLEARED = createAction('REPORTS_DATA_CLEARED');
}
