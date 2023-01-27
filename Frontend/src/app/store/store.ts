import { authStateReducer } from './auth-state/auth-state.reducer';
import { reportsStateReducer } from './reports-state/reviews-state.reducer';
import { reviewsStateReducer } from './reviews-state/reviews-state.reducer';

export const rootReducer = {
  authState: authStateReducer,
  reviewsState: reviewsStateReducer,
  reportsState: reportsStateReducer
};
