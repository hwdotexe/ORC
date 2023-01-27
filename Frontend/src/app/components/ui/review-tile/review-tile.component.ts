import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Review } from 'src/app/models/API/review.interface';
import { AccountType } from 'src/app/models/enum/account-type.enum';
import { ReviewTag } from 'src/app/models/review-tag.interface';
import { PermissionsService } from 'src/app/services/permissions-service/permissions.service';
import { ReviewsService } from 'src/app/services/reviews-service/reviews.service';
import { TagMetadataService } from 'src/app/services/tag-metadata/tag-metadata.service';
import { BaseUnsubscribeComponent } from '../../base-unsubscribe.component';
import * as moment from 'moment-timezone';
import { TimeService } from 'src/app/services/time-service/time.service';
import { ClubTimeStatus } from 'src/app/models/enum/club-time-status.interface';

@Component({
  selector: 'app-review-tile',
  templateUrl: './review-tile.component.html',
  styleUrls: ['./review-tile.component.css']
})
export class ReviewTileComponent extends BaseUnsubscribeComponent implements OnInit {
  @Input() review: Review;

  reviewSummaryLines: string[] = [];
  sortedTags: string[] = [];

  canEditDeleteReview$: Observable<boolean>;

  isExpanded: boolean;
  isDeleting: boolean;

  borderColor: string;
  hoursStatusColor: string;
  clubTimeStatus: ClubTimeStatus;

  constructor(
    private reviewsService: ReviewsService,
    private router: Router,
    private permissionsService: PermissionsService,
    private tagMetadataService: TagMetadataService,
    private timeService: TimeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.isExpanded = false;
    this.isDeleting = false;
    this.clubTimeStatus = this.getClubTimeStatus();
    this.borderColor = this.getTileBorderColor();
    this.hoursStatusColor = this.getHoursStatusColor();

    this.review.review.summary.split('\n').forEach(line => {
      if (line.length > 0) {
        this.reviewSummaryLines.push(line);
      }
    });

    this.sortReviewTags();

    this.canEditDeleteReview$ = this.permissionsService.accountType$.pipe(
      withLatestFrom(this.permissionsService.userID$),
      map(([accountType, userID]) => {
        return accountType === AccountType.ADMIN || accountType === AccountType.MODERATOR || this.review.user.userID === userID;
      })
    );
  }

  sortReviewTags(): void {
    this.review.review.tags.forEach(item => {
      this.sortedTags.push(item);
    });

    var coloredTags: ReviewTag[] = [];

    for (var i = 0; i < this.review.review.tags.length; i++) {
      var tag = this.review.review.tags[i];
      var tagData = this.tagMetadataService.getTag(tag);

      if (!tagData) {
        var index = this.sortedTags.indexOf(tag);
        var deleted = this.sortedTags.splice(index, 1);

        this.sortedTags.push(deleted[0]);
      } else {
        coloredTags.push(tagData);
      }
    }

    coloredTags.sort((a, b) => {
      if (!a.position && !b.position) {
        return 0;
      }

      if (!a.position) {
        return -1;
      }

      if (!b.position) {
        return 1;
      }

      var x = b.position - a.position;

      return x;
    });

    coloredTags.reverse();

    for (var i = 0; i < coloredTags.length; i++) {
      this.sortedTags[i] = coloredTags[i].display;
    }
  }

  isLineLast(line: string): boolean {
    return line === this.reviewSummaryLines[this.reviewSummaryLines.length - 1];
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
    this.isDeleting = false;
  }

  clickDelete(): void {
    if (!this.isDeleting) {
      this.isDeleting = true;
    } else {
      this.reviewsService
        .deleteReview$({ ReviewID: this.review.review.reviewID })
        .pipe(
          take(1),
          takeUntil(this.unsubscribe$),
          switchMap(response => {
            if (response) {
              return this.reviewsService.loadReviews$();
            } else {
              this.router.navigate(['/error']);
            }
          })
        )
        .subscribe();
    }
  }

  isRecent(): boolean {
    let currentDate = new Date();
    let reviewDate = new Date(this.review.review.dateCreated);
    let days = Math.floor((currentDate.getTime() - reviewDate.getTime()) / 1000 / 60 / 60 / 24);

    return days <= 7;
  }

  isOld(): boolean {
    let currentDate = new Date();
    let reviewDate = new Date(this.review.review.dateCreated);
    let days = Math.floor((currentDate.getTime() - reviewDate.getTime()) / 1000 / 60 / 60 / 24);

    return days >= 30 * 6;
  }

  private getTileBorderColor(): string {
    switch (this.clubTimeStatus) {
      case ClubTimeStatus.CLOSED:
        return 'border-gray-200';
      case ClubTimeStatus.OPENING_SOON:
        return 'border-sky-500';
      case ClubTimeStatus.OPEN:
        return 'border-green-500';
      case ClubTimeStatus.CLOSING_SOON:
        return 'border-orange-500';
    }
  }

  private getHoursStatusColor(): string {
    switch (this.clubTimeStatus) {
      case ClubTimeStatus.CLOSED:
        return 'text-gray-700';
      case ClubTimeStatus.OPENING_SOON:
        return 'text-sky-600';
      case ClubTimeStatus.OPEN:
        return 'text-green-600';
      case ClubTimeStatus.CLOSING_SOON:
        return 'text-orange-500';
    }
  }

  private getClubTimeStatus(): ClubTimeStatus {
    let dayOfWeek = this.timeService.getDayOfWeek();
    let now = new Date().getHours();

    for (var i = 0; i < this.review.review.clubHours.length; i++) {
      let hours = this.review.review.clubHours[i];

      if (hours.day) {
        if (hours.day.toLowerCase() === dayOfWeek.toLowerCase()) {
          let timeOpen = this.timeService.convertUtcToLocal(hours.open).hours();
          let timeClose = this.timeService.convertUtcToLocal(hours.close).hours();

          let differenceOpen = timeOpen - now;
          let differenceClose = timeClose - now;

          if (differenceClose > 0 && differenceClose <= 1) {
            return ClubTimeStatus.CLOSING_SOON;
          } else if (this.between(now, timeOpen, timeClose)) {
            return ClubTimeStatus.OPEN;
          } else if (differenceOpen > 0 && differenceOpen <= 2) {
            return ClubTimeStatus.OPENING_SOON;
          } else {
            return ClubTimeStatus.CLOSED;
          }
        }
      }
    }

    return ClubTimeStatus.CLOSED;
  }

  private between(time: number, open: number, close: number): boolean {
    if (close < open) {
      return time >= open || time < close;
    } else {
      return time >= open && time < close;
    }
  }
}
