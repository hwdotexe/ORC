import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AccountLoginRequest } from 'src/app/models/API/Request/account-login-request.interface';
import { FormName } from 'src/app/models/enum/form-name.enum';
import { AppDetailsStateService } from 'src/app/store/app-details-state/app-details-state.service';
import { AuthStateService } from 'src/app/store/auth-state/auth-state.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginInfoForm: UntypedFormGroup;
  FormName = FormName;

  constructor(
    private authStateService: AuthStateService,
    private formBuilder: UntypedFormBuilder,
    private appDetailsStateService: AppDetailsStateService
  ) {}

  ngOnInit(): void {
    this.loginInfoForm = this.formBuilder.group({
      email: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required, Validators.email])] }),
      password: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] })
    });
  }

  submit(): void {
    this.appDetailsStateService.onFormErrorsCleared();

    if (this.loginInfoForm.valid) {
      let loginData: AccountLoginRequest = {
        email: this.loginInfoForm.get('email').value,
        password: this.loginInfoForm.get('password').value
      };

      this.dispatch(loginData);
    }
  }

  dispatch(dispatchData: AccountLoginRequest): void {
    this.authStateService.onLoginRequest(dispatchData);
  }
}
