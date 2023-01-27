import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map, filter } from 'rxjs/operators';
import { GetReportsResponse } from 'src/app/models/API/Response/get-reports-response';
import { Review } from 'src/app/models/API/review.interface';
import { HTTPService } from 'src/app/services/httpservice/http.service';
import { ReportsService } from 'src/app/services/reports-service/reports.service';
import { ReviewsStateService } from 'src/app/store/reviews-state/reviews-state.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  reports$: Observable<GetReportsResponse>;
  reviews$: Observable<Review[]>;

  constructor(private reviewsStateService: ReviewsStateService, private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.reports$ = this.reportsService.loadReports$();
    this.reviews$ = this.reviewsStateService.reviews$;
  }

  matchReviewToReport$(reviewID: string): Observable<Review> {
    return this.reviews$.pipe(
      take(1),
      map(reviews => {
        return reviews.find(r => r.review.reviewID === reviewID);
      })
    );
  }
}
