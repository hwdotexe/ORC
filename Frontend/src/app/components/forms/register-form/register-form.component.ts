import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountCreateRequest } from 'src/app/models/API/Request/account-create-request.interface';
import { PageLoadingService } from 'src/app/services/page-loading-service/page-loading.service';
import { AuthStateService } from 'src/app/store/auth-state/auth-state.service';
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

  constructor(private formBuilder: UntypedFormBuilder, private pageLoadingService: PageLoadingService, private authStateService: AuthStateService) {
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
      displayName: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] })
    });
  }

  submit(): void {
    this.showInvalidRegistration$.next(false);
    this.showErrorValidations$.next(false);
    this.showRegisterError$.next(false);

    if (this.registerAccountForm.valid) {
      let registerData: AccountCreateRequest = {
        email: this.registerAccountForm.get('email').value,
        password: this.registerAccountForm.get('password').value,
        displayName: this.registerAccountForm.get('displayName').value
      };

      this.dispatch(registerData);
    } else {
      this.showErrorValidations$.next(true);
    }
  }

  dispatch(dispatchData: AccountCreateRequest): void {
    this.authStateService.onRegisterRequest(dispatchData);
  }
}
