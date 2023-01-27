import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { PermissionsService } from '../permissions-service/permissions.service';
import { ReviewsService } from '../reviews-service/reviews.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateEditReviewGuardService implements CanActivate {
  constructor(private permissionsService: PermissionsService, private reviewsService: ReviewsService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    let reviewID = route.queryParams['id'];

    return this.reviewsService.getReviewByID$(reviewID).pipe(
      switchMap(review => this.permissionsService.canEditReview$(review.review.userID)),
      tap(canEdit => {
        if (!canEdit) {
          this.router.navigate(['']);
        }
      })
    );
  }
}
