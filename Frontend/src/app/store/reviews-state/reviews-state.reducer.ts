import { createReducer, on } from '@ngrx/store';
import { reviewsInitialState } from './reviews-initial-state';
import { ReviewsStateActions } from './reviews-state.actions';
import { ReviewsState } from './reviews-state.interface';

const reducer = createReducer(
  reviewsInitialState,
  on(ReviewsStateActions.REVIEWS_DATA_RECEIVED, (state, action): ReviewsState => ({ reviews: action.reviews })),
  on(ReviewsStateActions.REVIEWS_DATA_CLEARED, (state, action): ReviewsState => (reviewsInitialState))
);

export function reviewsStateReducer(state, action) {
  return reducer(state, action);
}
