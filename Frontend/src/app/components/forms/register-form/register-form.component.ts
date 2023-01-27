import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { RegisterDataRequest } from 'src/app/models/API/Request/register-data-request.interface';
import { CaptchaService } from 'src/app/services/captcha/captcha.service';
import { RegisterFormComponentService } from 'src/app/services/forms/register-form-component-service/register-form-component.service';
import { PageLoadingService } from 'src/app/services/page-loading-service/page-loading.service';
import { BaseUnsubscribeComponent } from '../../base-unsubscribe.component';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent extends BaseUnsubscribeComponent implements OnInit {
  isLoading$: Observable<boolean>;

  registerAccountForm: UntypedFormGroup;
  showErrorValidations$: BehaviorSubject<boolean>;
  showInvalidRegistration$: BehaviorSubject<boolean>;
  showRegisterError$: BehaviorSubject<boolean>;

  constructor(
    private componentService: RegisterFormComponentService,
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
    this.showInvalidRegistration$ = new BehaviorSubject<boolean>(false);
    this.showRegisterError$ = new BehaviorSubject<boolean>(false);

    this.registerAccountForm = this.formBuilder.group({
      email: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required, Validators.email])] }),
      password: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      characterName: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      characterServer: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      accountCreationToken: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] })
    });
  }

  submit(): void {
    this.showInvalidRegistration$.next(false);
    this.showErrorValidations$.next(false);
    this.showRegisterError$.next(false);

    if (this.registerAccountForm.valid) {
      this.captchaService
        .createCaptchaToken$('PUT_REGISTER')
        .pipe(take(1), takeUntil(this.unsubscribe$))
        .subscribe(token => {
          let registerData: RegisterDataRequest = {
            email: this.registerAccountForm.get('email').value,
            password: this.registerAccountForm.get('password').value,
            characterName: this.registerAccountForm.get('characterName').value,
            characterServer: this.registerAccountForm.get('characterServer').value,
            createAccountToken: this.registerAccountForm.get('accountCreationToken').value,
            captchaToken: token
          };

          this.dispatch(registerData);
        });
    } else {
      this.showErrorValidations$.next(true);
    }
  }

  dispatch(dispatchData: RegisterDataRequest): void {
    this.componentService
      .sendRegisterData(dispatchData)
      .pipe(take(1), takeUntil(this.unsubscribe$))
      .subscribe(responseCode => {
        switch (responseCode) {
          case 201:
            this.router.navigate(['/account-created']);
            break;
          case 401:
            this.showInvalidRegistration$.next(true);
            break;
          default:
            this.showRegisterError$.next(true);
        }
      });
  }
}
