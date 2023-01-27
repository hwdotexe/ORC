import { AppState } from '../app-state.interface';

export abstract class ReportsStateSelectors {
  static readonly reports = (state: AppState) => state.reportsState.reports;
}
