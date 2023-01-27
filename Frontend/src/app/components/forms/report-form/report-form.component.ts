import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ComposeReportRequest } from 'src/app/models/API/Request/compose-report-request.interface';
import { Review } from 'src/app/models/API/review.interface';
import { CaptchaService } from 'src/app/services/captcha/captcha.service';
import { ReportFormComponentService } from 'src/app/services/forms/report-form-component-service/report-form-component.service';
import { PageLoadingService } from 'src/app/services/page-loading-service/page-loading.service';
import { BaseUnsubscribeComponent } from '../../base-unsubscribe.component';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent extends BaseUnsubscribeComponent implements OnInit {
  @Input() reviewID: string;

  isLoading$: Observable<boolean>;

  review$: Observable<Review>;
  showErrorValidations$: BehaviorSubject<boolean>;
  showInvalidRequest$: BehaviorSubject<boolean>;
  showComposeError$: BehaviorSubject<boolean>;

  composeReportForm: UntypedFormGroup;

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private captchaService: CaptchaService,
    private componentService: ReportFormComponentService,
    private pageLoadingService: PageLoadingService
  ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.pageLoadingService.showLoadingIcon$;

    this.showErrorValidations$ = new BehaviorSubject<boolean>(false);
    this.showInvalidRequest$ = new BehaviorSubject<boolean>(false);
    this.showComposeError$ = new BehaviorSubject<boolean>(false);

    this.composeReportForm = this.formBuilder.group({
      reportReason: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      requestorName: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      requestorServer: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      contact: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] })
    });
  }

  submit(): void {
    this.showInvalidRequest$.next(false);
    this.showComposeError$.next(false);
    this.showErrorValidations$.next(false);

    if (this.composeReportForm.valid) {
      this.captchaService
        .createCaptchaToken$('PUT_REPORT')
        .pipe(take(1), takeUntil(this.unsubscribe$))
        .subscribe(token => {
          let registerRequest: ComposeReportRequest = {
            reviewID: this.reviewID,
            reportReason: this.composeReportForm.get('reportReason').value,
            characterName: this.composeReportForm.get('requestorName').value,
            characterServer: this.composeReportForm.get('requestorServer').value,
            contact: this.composeReportForm.get('contact').value,
            captchaToken: token
          };

          this.dispatch(registerRequest);
        });
    } else {
      this.showErrorValidations$.next(true);
    }
  }

  dispatch(dispatchData: ComposeReportRequest): void {
    this.componentService
      .sendRequestData(dispatchData)
      .pipe(take(1), takeUntil(this.unsubscribe$))
      .subscribe(responseCode => {
        switch (responseCode) {
          case 201:
            this.router.navigate(['/report-sent']);
            break;
          case 400:
            this.showInvalidRequest$.next(true);
            break;
          default:
            this.showComposeError$.next(true);
        }
      });
  }
}
