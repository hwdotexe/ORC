import { AuthState } from './auth-state/auth-state.interface';
import { ReportsState } from './reports-state/reports-state.interface';
import { ReviewsState } from './reviews-state/reviews-state.interface';

export interface AppState {
  authState: AuthState;
  reviewsState: ReviewsState;
  reportsState: ReportsState;
}
