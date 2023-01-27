import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Review } from 'src/app/models/API/review.interface';
import { ReviewsStateActions } from './reviews-state.actions';
import { ReviewsStateSelectors } from './reviews-state.selectors';

@Injectable({
  providedIn: 'root',
})
export class ReviewsStateService {
  reviews$: Observable<Review[]> = this.store.select(ReviewsStateSelectors.reviews);

  constructor(private store: Store) {}

  onReviewDataReceived(reviews: Review[]): void {
    this.store.dispatch(ReviewsStateActions.REVIEWS_DATA_RECEIVED({ reviews }));
  }

  onReviewDataCleared(): void {
    this.store.dispatch(ReviewsStateActions.REVIEWS_DATA_CLEARED());
  }
}
