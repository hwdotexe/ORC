import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AccountCreateRequest } from 'src/app/models/API/Request/account-create-request.interface';
import { FormName } from 'src/app/models/enum/form-name.enum';
import { AppDetailsStateService } from 'src/app/store/app-details-state/app-details-state.service';
import { AuthStateService } from 'src/app/store/auth-state/auth-state.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validator';
import { passwordStrengthValidator } from 'src/app/validators/password-strength.validator';
import { BaseUnsubscribeComponent } from '../../base-unsubscribe.component';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent extends BaseUnsubscribeComponent implements OnInit {
  registerAccountForm: UntypedFormGroup;
  FormName = FormName;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authStateService: AuthStateService,
    private appDetailsStateService: AppDetailsStateService
  ) {
    super();
  }

  ngOnInit(): void {
    // TODO: Custom validator for confirmPassword
    this.registerAccountForm = this.formBuilder.group({
      email: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required, Validators.email])] }),
      password: this.formBuilder.control('', {
        updateOn: 'submit',
        validators: [Validators.compose([Validators.required, Validators.minLength(8), passwordStrengthValidator()])]
      }),
      confirmPassword: this.formBuilder.control('', {
        updateOn: 'submit',
        validators: [Validators.compose([Validators.required])]
      }),
      displayName: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      agreeTOS: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.requiredTrue])] })
    });

    // Add a confirm password matching validator.
    var passwordField = this.registerAccountForm.get('password');
    this.registerAccountForm.get('confirmPassword').addValidators(confirmPasswordValidator(passwordField));
  }

  submit(): void {
    this.appDetailsStateService.onFormErrorsCleared();

    // Must call this manually because the validator was added separately.
    this.registerAccountForm.get('confirmPassword').updateValueAndValidity();

    if (this.isFormValid()) {
      let registerData: AccountCreateRequest = {
        email: this.registerAccountForm.get('email').value,
        password: this.registerAccountForm.get('password').value,
        displayName: this.registerAccountForm.get('displayName').value
      };

      this.dispatch(registerData);
    }
  }

  dispatch(dispatchData: AccountCreateRequest): void {
    this.authStateService.onRegisterRequest(dispatchData);
  }

  private isFormValid(): boolean {
    if (this.registerAccountForm.valid) {
      let password = this.registerAccountForm.get('password').value;
      let confirmPassword = this.registerAccountForm.get('confirmPassword').value;

      return password === confirmPassword;
    }

    return false;
  }
}
