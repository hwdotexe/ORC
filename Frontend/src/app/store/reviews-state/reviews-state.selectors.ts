import { AppState } from '../app-state.interface';

export abstract class ReviewsStateSelectors {
  static readonly reviews = (state: AppState) => state.reviewsState.reviews;
}
