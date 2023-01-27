import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ComposeReviewRequest } from 'src/app/models/API/Request/compose-review-request.interface';
import { EditReviewRequest } from 'src/app/models/API/Request/edit-review-request.interface';
import { ComposeReviewResponse } from 'src/app/models/API/Response/compose-review-response.interface';
import { EditReviewResponse } from 'src/app/models/API/Response/edit-review-response.interface';
import { HTTPService } from '../../httpservice/http.service';
import { ReviewsService } from '../../reviews-service/reviews.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewFormComponentService {
  ERROR_BAD_REQUEST = 'Your review could not be posted. Please double-check the form and try again.';
  ERROR_NOT_AUTHORIZED = 'Your session could not be validated. Please log back in and try again.';
  ERROR_SERVER = 'There was an error on the server and your review could not be posted. Please try again later.';

  errorMessage$ = new BehaviorSubject<string>(null);

  constructor(private httpService: HTTPService) {}

  clearErrors(): void {
    this.errorMessage$.next(null);
  }

  postNewReview(reviewData: ComposeReviewRequest): Observable<number> {
    this.errorMessage$.next(null);

    return this.httpService
      .PUT<ComposeReviewResponse>(
        'review',
        {
          Title: reviewData.title,
          ClubName: reviewData.clubName,
          ClubDatacenter: reviewData.clubDatacenter,
          ClubServer: reviewData.clubServer,
          ClubDistrict: reviewData.clubDistrict,
          ClubWard: reviewData.clubWard,
          ClubPlot: reviewData.clubPlot,
          ClubHours: reviewData.clubHours,
          Summary: reviewData.summary,
          StarRating: reviewData.starRating,
          Website: reviewData.website,
          Tags: reviewData.tags
        },
        'ADD_REVIEW'
      )
      .pipe(
        take(1),
        map(response => response.statusCode),
        tap(statusCode => {
          if (statusCode > 299) {
            switch (statusCode) {
              case 400:
                this.errorMessage$.next(this.ERROR_BAD_REQUEST);
                break;
              case 401:
                this.errorMessage$.next(this.ERROR_NOT_AUTHORIZED);
                break;
              default:
                this.errorMessage$.next(this.ERROR_SERVER);
            }
          }
        })
      );
  }

  updateReview(reviewData: EditReviewRequest): Observable<number> {
    this.errorMessage$.next(null);

    return this.httpService
      .PATCH<EditReviewResponse>(
        'review',
        {
          ReviewID: reviewData.reviewid,
          Title: reviewData.title,
          ClubName: reviewData.clubName,
          ClubDatacenter: reviewData.clubDatacenter,
          ClubServer: reviewData.clubServer,
          ClubDistrict: reviewData.clubDistrict,
          ClubWard: reviewData.clubWard,
          ClubPlot: reviewData.clubPlot,
          ClubHours: reviewData.clubHours,
          Summary: reviewData.summary,
          StarRating: reviewData.starRating,
          Website: reviewData.website,
          Tags: reviewData.tags
        },
        'EDIT_REVIEW'
      )
      .pipe(
        take(1),
        map(response => response.statusCode),
        tap(statusCode => {
          if (statusCode > 299) {
            switch (statusCode) {
              case 400:
                this.errorMessage$.next(this.ERROR_BAD_REQUEST);
                break;
              case 401:
                this.errorMessage$.next(this.ERROR_NOT_AUTHORIZED);
                break;
              default:
                this.errorMessage$.next(this.ERROR_SERVER);
            }
          }
        })
      );
  }
}
