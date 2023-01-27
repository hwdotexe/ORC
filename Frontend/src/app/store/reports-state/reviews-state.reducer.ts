import { createReducer, on } from '@ngrx/store';
import { reportsInitialState } from './reports-initial-state';
import { ReportsStateActions } from './reports-state.actions';
import { ReportsState } from './reports-state.interface';

const reducer = createReducer(
  reportsInitialState,
  on(ReportsStateActions.REPORTS_DATA_RECEIVED, (state, action): ReportsState => ({ reports: action.reports })),
  on(ReportsStateActions.REPORTS_DATA_CLEARED, (state, action): ReportsState => reportsInitialState)
);

export function reportsStateReducer(state, action) {
  return reducer(state, action);
}
