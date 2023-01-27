import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComposeReviewRequest } from 'src/app/models/API/Request/compose-review-request.interface';
import { ReviewFormComponentService } from 'src/app/services/forms/review-form-component-service/review-form-component.service';
import { PageLoadingService } from 'src/app/services/page-loading-service/page-loading.service';
import { BaseUnsubscribeComponent } from '../../base-unsubscribe.component';
import { take, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Review } from 'src/app/models/API/review.interface';
import { EditReviewRequest } from 'src/app/models/API/Request/edit-review-request.interface';
import { ClubHoursAdding } from 'src/app/models/club-hours-adding.interface';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent extends BaseUnsubscribeComponent implements OnInit {
  @Input() review?: Review;

  composeReviewForm: UntypedFormGroup;
  isVariableTime: boolean = false;

  isLoading$: Observable<boolean>;
  submitError$: BehaviorSubject<string>;

  showErrorValidations$ = new BehaviorSubject<boolean>(false);

  constructor(
    private formBuilder: UntypedFormBuilder,
    private pageLoadingService: PageLoadingService,
    private componentService: ReviewFormComponentService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.componentService.clearErrors();

    this.isLoading$ = this.pageLoadingService.showLoadingIcon$;
    this.submitError$ = this.componentService.errorMessage$;
    this.isVariableTime = !!this.review?.review.clubHours[0]?.variableDay;

    this.composeReviewForm = this.formBuilder.group({
      title: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      clubName: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      clubDatacenter: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      clubServer: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      clubDistrict: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      clubWard: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      clubPlot: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      clubHours: this.formBuilder.control([], { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      summary: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      starRating: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      website: this.formBuilder.control('', { updateOn: 'submit' }),
      tags: this.formBuilder.control([], { updateOn: 'submit', validators: [Validators.compose([Validators.required])] })
    });

    if (this.review) {
      this.patchValues();
    }
  }

  submit(): void {
    this.showErrorValidations$.next(false);

    if (this.composeReviewForm.valid) {
      if (this.review) {
        this.editReview();
      } else {
        this.postNewReview();
      }
    } else {
      console.log('Value of control: ', this.composeReviewForm.get('clubHours').value);

      this.showErrorValidations$.next(true);
    }
  }

  private postNewReview(): void {
    let request: ComposeReviewRequest = {
      title: this.composeReviewForm.get('title').value,
      clubName: this.composeReviewForm.get('clubName').value,
      clubDatacenter: this.composeReviewForm.get('clubDatacenter').value,
      clubServer: this.composeReviewForm.get('clubServer').value,
      clubDistrict: this.composeReviewForm.get('clubDistrict').value,
      clubWard: this.composeReviewForm.get('clubWard').value,
      clubPlot: this.composeReviewForm.get('clubPlot').value,
      clubHours: this.composeReviewForm.get('clubHours').value,
      summary: this.composeReviewForm.get('summary').value,
      starRating: this.composeReviewForm.get('starRating').value,
      website: this.composeReviewForm.get('website').value,
      tags: this.composeReviewForm.get('tags').value
    };

    this.componentService
      .postNewReview(request)
      .pipe(take(1), takeUntil(this.unsubscribe$))
      .subscribe(responseCode => {
        if (responseCode === 201) {
          this.router.navigate(['/']);
        }
      });
  }

  private editReview(): void {
    let request: EditReviewRequest = {
      reviewid: this.review.review.reviewID,
      title: this.composeReviewForm.get('title').value,
      clubName: this.composeReviewForm.get('clubName').value,
      clubDatacenter: this.composeReviewForm.get('clubDatacenter').value,
      clubServer: this.composeReviewForm.get('clubServer').value,
      clubDistrict: this.composeReviewForm.get('clubDistrict').value,
      clubWard: this.composeReviewForm.get('clubWard').value,
      clubPlot: this.composeReviewForm.get('clubPlot').value,
      clubHours: this.composeReviewForm.get('clubHours').value,
      summary: this.composeReviewForm.get('summary').value,
      starRating: this.composeReviewForm.get('starRating').value,
      website: this.composeReviewForm.get('website').value,
      tags: this.composeReviewForm.get('tags').value
    };

    this.componentService
      .updateReview(request)
      .pipe(take(1), takeUntil(this.unsubscribe$))
      .subscribe(responseCode => {
        if (responseCode === 200) {
          this.router.navigate(['/']);
        }
      });
  }

  private patchValues(): void {
    this.composeReviewForm.controls['title'].patchValue(this.review.review.reviewTitle);
    this.composeReviewForm.controls['clubName'].patchValue(this.review.review.clubName);
    this.composeReviewForm.controls['clubDatacenter'].patchValue(this.review.review.clubDatacenter);
    this.composeReviewForm.controls['clubServer'].patchValue(this.review.review.clubServer);
    this.composeReviewForm.controls['clubDistrict'].patchValue(this.review.review.clubDistrict);
    this.composeReviewForm.controls['clubWard'].patchValue(this.review.review.clubWard);
    this.composeReviewForm.controls['clubPlot'].patchValue(this.review.review.clubPlot);
    this.composeReviewForm.controls['summary'].patchValue(this.review.review.summary);
    this.composeReviewForm.controls['starRating'].patchValue(this.review.review.starRating);
    this.composeReviewForm.controls['website'].patchValue(this.review.review.website);

    this.updateTagListControlValue(this.review.review.tags);
    this.updateClubHoursControlValue(this.review.review.clubHours);
  }

  updateTagListControlValue(tags: string[]): void {
    this.composeReviewForm.controls['tags'].patchValue(tags);
  }

  updateClubHoursControlValue(hours: ClubHoursAdding[]): void {
    this.composeReviewForm.controls['clubHours'].patchValue(hours);
  }

  toggleHoursType(isVariable: boolean): void {
    this.isVariableTime = isVariable;
  }
}
