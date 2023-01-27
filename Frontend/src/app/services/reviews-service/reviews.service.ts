import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { DeleteReviewRequest } from 'src/app/models/API/Request/delete-review-request.interface';
import { ReviewsResponse } from 'src/app/models/API/Response/reviews-response.interface';
import { Review } from 'src/app/models/API/review.interface';
import { ReviewsStateService } from 'src/app/store/reviews-state/reviews-state.service';
import { HTTPService } from '../httpservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  hasError$ = new BehaviorSubject<boolean>(false);

  constructor(private reviewsStateService: ReviewsStateService, private httpService: HTTPService) {}

  getReviewByID$(id: string): Observable<Review> {
    return this.reviewsStateService.reviews$.pipe(
      map(reviews => {
        return reviews.filter(review => review.review.reviewID === id)[0];
      })
    );
  }

  loadReviews$(): Observable<Review[]> {
    this.hasError$.next(false);

    return this.httpService.GET<ReviewsResponse>('review', 'LOAD_REVIEWS').pipe(
      take(1),
      switchMap(response => {
        if (response.statusCode === 200) {
          this.reviewsStateService.onReviewDataReceived(response.responseBody);

          return this.reviewsStateService.reviews$;
        } else {
          this.hasError$.next(true);
        }
      })
    );
  }

  deleteReview$(request: DeleteReviewRequest): Observable<boolean> {
    return this.httpService.DELETE<DeleteReviewRequest>('review', request, 'DELETE_REVIEW').pipe(
      take(1),
      map(response => {
        if (response.statusCode === 200) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
