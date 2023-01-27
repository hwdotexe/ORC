import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Review } from 'src/app/models/API/review.interface';
import { ReviewsService } from 'src/app/services/reviews-service/reviews.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  review$: Observable<Review>;

  reviewID: string;

  constructor(private activatedRoute: ActivatedRoute, private reviewsService: ReviewsService, private router: Router) {}

  ngOnInit(): void {
    this.reviewID = this.activatedRoute.snapshot.queryParams['id'];
    this.review$ = this.reviewsService.getReviewByID$(this.reviewID).pipe(
      tap(review => {
        if (!review) {
          this.router.navigate(['/not-found']);
        }
      })
    );
  }
}
