import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Review } from 'src/app/models/API/review.interface';
import { ReviewsService } from 'src/app/services/reviews-service/reviews.service';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {
  review$: Observable<Review>;

  constructor(private activatedRoute: ActivatedRoute, private reviewsService: ReviewsService, private router: Router) {}

  ngOnInit(): void {
    let reviewID = this.activatedRoute.snapshot.queryParams['id'];
    this.review$ = this.reviewsService.getReviewByID$(reviewID).pipe(
      tap(review => {
        if (!review) {
          this.router.navigate(['/not-found']);
        }
      })
    );
  }
}
