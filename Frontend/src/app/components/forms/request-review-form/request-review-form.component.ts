import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ComposeRequestRequest } from 'src/app/models/API/Request/compose-request-request.interface';
import { CaptchaService } from 'src/app/services/captcha/captcha.service';
import { RequestReviewFormComponentService } from 'src/app/services/forms/request-review-form-component-service/request-review-form-component.service';
import { PageLoadingService } from 'src/app/services/page-loading-service/page-loading.service';
import { BaseUnsubscribeComponent } from '../../base-unsubscribe.component';

@Component({
  selector: 'app-request-review-form',
  templateUrl: './request-review-form.component.html',
  styleUrls: ['./request-review-form.component.css']
})
export class RequestReviewFormComponent extends BaseUnsubscribeComponent implements OnInit {
  isLoading$: Observable<boolean>;

  composeRequestForm: UntypedFormGroup;
  showErrorValidations$: BehaviorSubject<boolean>;
  showInvalidRequest$: BehaviorSubject<boolean>;
  showComposeError$: BehaviorSubject<boolean>;

  constructor(
    private componentService: RequestReviewFormComponentService,
    private formBuilder: UntypedFormBuilder,
    private pageLoadingService: PageLoadingService,
    private captchaService: CaptchaService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.pageLoadingService.showLoadingIcon$;

    this.showErrorValidations$ = new BehaviorSubject<boolean>(false);
    this.showInvalidRequest$ = new BehaviorSubject<boolean>(false);
    this.showComposeError$ = new BehaviorSubject<boolean>(false);

    this.composeRequestForm = this.formBuilder.group({
      requestorName: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      requestorServer: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      clubName: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      clubDatacenter: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      clubServer: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      clubDistrict: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      clubWard: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      clubPlot: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      clubHours: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      info: this.formBuilder.control('', { updateOn: 'submit' }),
      clubWebsite: this.formBuilder.control('', { updateOn: 'submit' })
    });
  }

  submit(): void {
    this.showInvalidRequest$.next(false);
    this.showComposeError$.next(false);
    this.showErrorValidations$.next(false);

    if (this.composeRequestForm.valid) {
      this.captchaService
        .createCaptchaToken$('PUT_REQUEST_REVIEW')
        .pipe(take(1), takeUntil(this.unsubscribe$))
        .subscribe(token => {
          let registerRequest: ComposeRequestRequest = {
            requestorName: this.composeRequestForm.get('requestorName').value,
            requestorServer: this.composeRequestForm.get('requestorServer').value,
            clubName: this.composeRequestForm.get('clubName').value,
            clubDatacenter: this.composeRequestForm.get('clubDatacenter').value,
            clubServer: this.composeRequestForm.get('clubServer').value,
            clubDistrict: this.composeRequestForm.get('clubDistrict').value,
            clubWard: this.composeRequestForm.get('clubWard').value,
            clubPlot: this.composeRequestForm.get('clubPlot').value,
            clubHours: this.composeRequestForm.get('clubHours').value,
            info: this.composeRequestForm.get('info').value,
            clubWebsite: this.composeRequestForm.get('clubWebsite').value,
            captchaToken: token
          };

          this.dispatch(registerRequest);
        });
    } else {
      this.showErrorValidations$.next(true);
    }
  }

  dispatch(dispatchData: ComposeRequestRequest): void {
    this.componentService
      .sendRequestData(dispatchData)
      .pipe(take(1), takeUntil(this.unsubscribe$))
      .subscribe(responseCode => {
        switch (responseCode) {
          case 201:
            this.router.navigate(['/request-submitted']);
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
