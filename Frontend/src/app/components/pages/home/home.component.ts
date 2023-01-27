import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { Review } from 'src/app/models/API/review.interface';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { PageLoadingService } from 'src/app/services/page-loading-service/page-loading.service';
import { PermissionsService } from 'src/app/services/permissions-service/permissions.service';
import { ReviewsService } from 'src/app/services/reviews-service/reviews.service';
import { BaseUnsubscribeComponent } from '../../base-unsubscribe.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseUnsubscribeComponent implements OnInit {
  reviews$: Observable<Review[]>;
  isLoading$: Observable<boolean>;
  hasError$: BehaviorSubject<boolean>;

  canPostReview$: Observable<boolean>;
  canViewRequests$: Observable<boolean>;
  canViewReports$: Observable<boolean>;
  canCreateAccountToken$: Observable<boolean>;
  canManageUsers$: Observable<boolean>;

  userName$: Observable<string>;
  userAvatarURL$: Observable<string>;
  userAccountType$: Observable<string>;

  showFilters = false;
  displayedReviews: number;
  datacenterFilter: string;
  tagFilter: string[] = [];

  constructor(
    private reviewsService: ReviewsService,
    private pageLoadingService: PageLoadingService,
    private permissionsService: PermissionsService,
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.pageLoadingService.showLoadingIcon$;
    this.hasError$ = this.reviewsService.hasError$;

    this.canPostReview$ = this.permissionsService.canPostReview$();
    this.canViewRequests$ = this.permissionsService.canViewRequests$();
    this.canViewReports$ = this.permissionsService.canViewReports$();
    this.canCreateAccountToken$ = this.permissionsService.canCreateAccountToken$();
    this.canManageUsers$ = this.permissionsService.canManageUsers$();
    this.userName$ = this.authService.getUserName$();
    this.userAvatarURL$ = this.authService.getUserAvatarURL$();
    this.userAccountType$ = this.authService.getUserAccountType$();
    this.reviews$ = this.reviewsService.loadReviews$();

    this.canPostReview$
      .pipe(
        filter(canPost => canPost == true),
        switchMap(() => this.authService.checkUserSessionActive$()),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(isActive => {
        if (!isActive) {
          this.router.navigate(['/logged-out']);
        }
      });

    this.displayedReviews = 7;
  }

  filterReviews(reviews: Review[]): Review[] {
    var dcFilteredReviews = reviews.filter(review => {
      if (this.datacenterFilter != null) {
        if (this.datacenterFilter === '*') {
          return true;
        }

        return review.review.clubDatacenter.toLowerCase() === this.datacenterFilter.toLowerCase();
      }

      return true;
    });

    var tagFilteredReviews = dcFilteredReviews.filter(review => {
      if (this.tagFilter != null) {
        if (this.tagFilter.length === 0) {
          return true;
        }

        var includesAny = false;

        this.tagFilter.forEach(searchTag => {
          for (var i = 0; i < review.review.tags.length; i++) {
            if (review.review.tags[i].toLowerCase().includes(searchTag.toLowerCase())) {
              includesAny = true;
              break;
            }
          }
        });

        return includesAny;
      }

      return true;
    });

    return tagFilteredReviews;
  }

  truncateReviews(reviews: Review[]): Review[] {
    return reviews.slice(0, this.displayedReviews);
  }

  loadMoreReviews(): void {
    this.displayedReviews += 10;
  }

  toggleFilter(): void {
    this.showFilters = !this.showFilters;
  }

  filterDatacenter(event: any): void {
    this.datacenterFilter = event.target.value;
  }

  filterTags(tags: string[]): void {
    this.tagFilter = tags;
  }
}
