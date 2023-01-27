import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CreateAccountTokenRequest } from 'src/app/models/API/Request/create-account-token-request.interface';
import { CreateAccountTokenResponse } from 'src/app/models/API/Response/create-account-token-response.interface';
import { CreateAccountTokenFormComponentService } from 'src/app/services/forms/create-account-token-form-component-service/create-account-token-form-component.service';
import { PageLoadingService } from 'src/app/services/page-loading-service/page-loading.service';
import { BaseUnsubscribeComponent } from '../../base-unsubscribe.component';

@Component({
  selector: 'app-create-account-token-form',
  templateUrl: './create-account-token-form.component.html',
  styleUrls: ['./create-account-token-form.component.css']
})
export class CreateAccountTokenFormComponent extends BaseUnsubscribeComponent implements OnInit {
  @Output() tokenResponse = new EventEmitter<CreateAccountTokenResponse>();

  createTokenForm: UntypedFormGroup;

  isLoading$: Observable<boolean>;
  submitError$ = new BehaviorSubject<string>('');
  showErrorValidations$ = new BehaviorSubject<boolean>(false);

  constructor(
    private formBuilder: UntypedFormBuilder,
    private pageLoadingService: PageLoadingService,
    private componentService: CreateAccountTokenFormComponentService
  ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.pageLoadingService.showLoadingIcon$;

    this.createTokenForm = this.formBuilder.group({
      tokenAccessLevel: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] })
    });
  }

  submit(): void {
    this.showErrorValidations$.next(false);

    if (this.createTokenForm.valid) {
      let request: CreateAccountTokenRequest = {
        AccountType: this.createTokenForm.get('tokenAccessLevel').value
      };

      this.dispatch(request);
    } else {
      this.showErrorValidations$.next(true);
    }
  }

  dispatch(dispatchData: CreateAccountTokenRequest): void {
    this.componentService
      .sendTokenData(dispatchData)
      .pipe(take(1), takeUntil(this.unsubscribe$))
      .subscribe(response => {
        if (response.token) {
          this.tokenResponse.emit(response);
        } else {
          this.showErrorValidations$.next(true);
        }
      });
  }
}
