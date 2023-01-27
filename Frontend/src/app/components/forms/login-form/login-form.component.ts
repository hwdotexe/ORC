import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CaptchaService } from 'src/app/services/captcha/captcha.service';
import { LoginFormComponentService } from 'src/app/services/forms/login-form-component-service/login-form-component.service';
import { PageLoadingService } from 'src/app/services/page-loading-service/page-loading.service';
import { BaseUnsubscribeComponent } from '../../base-unsubscribe.component';
import { takeUntil, take } from 'rxjs/operators';
import { AccountLoginRequest } from 'src/app/models/API/Request/account-login-request.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent extends BaseUnsubscribeComponent implements OnInit {
  isLoading$: Observable<boolean>;

  loginInfoForm: UntypedFormGroup;
  showErrorValidations$: BehaviorSubject<boolean>;
  showInvalidLogin$: BehaviorSubject<boolean>;
  showLoginError$: BehaviorSubject<boolean>;

  constructor(
    private componentService: LoginFormComponentService,
    private formBuilder: UntypedFormBuilder,
    private pageLoadingService: PageLoadingService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.pageLoadingService.showLoadingIcon$;

    this.showErrorValidations$ = new BehaviorSubject<boolean>(false);
    this.showInvalidLogin$ = new BehaviorSubject<boolean>(false);
    this.showLoginError$ = new BehaviorSubject<boolean>(false);

    this.loginInfoForm = this.formBuilder.group({
      email: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required, Validators.email])] }),
      password: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] })
    });
  }

  submit(): void {
    this.showInvalidLogin$.next(false);
    this.showLoginError$.next(false);
    this.showErrorValidations$.next(false);

    if (this.loginInfoForm.valid) {
      let loginData: AccountLoginRequest = {
        email: this.loginInfoForm.get('email').value,
        password: this.loginInfoForm.get('password').value
      };

      this.dispatch(loginData);
    } else {
      this.showErrorValidations$.next(true);
    }
  }

  dispatch(dispatchData: AccountLoginRequest): void {
    this.componentService
      .sendLoginData(dispatchData)
      .pipe(take(1), takeUntil(this.unsubscribe$))
      .subscribe(responseCode => {
        switch (responseCode) {
          case 200:
            this.router.navigate(['/']);
            break;
          case 401:
            this.showInvalidLogin$.next(true);
            break;
          default:
            this.showLoginError$.next(true);
        }
      });
  }
}
