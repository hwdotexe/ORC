import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { take, takeUntil } from 'rxjs/operators';
import { AccountUpdateRequest } from 'src/app/models/API/Request/account-update-request.interface';
import { UpdateCharacterFormComponentService } from 'src/app/services/forms/update-character-form-component-service/update-character-form-component.service';
import { PageLoadingService } from 'src/app/services/page-loading-service/page-loading.service';
import { AuthStateService } from 'src/app/store/auth-state/auth-state.service';
import { BaseUnsubscribeComponent } from '../../base-unsubscribe.component';

@Component({
  selector: 'app-update-character-form',
  templateUrl: './update-character-form.component.html',
  styleUrls: ['./update-character-form.component.css']
})
export class UpdateCharacterFormComponent extends BaseUnsubscribeComponent implements OnInit {
  isLoading$: Observable<boolean>;

  showErrorValidations$ = new BehaviorSubject<boolean>(false);

  updateCharacterForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private pageLoadingService: PageLoadingService,
    private router: Router,
    private authStateService: AuthStateService,
    private componentService: UpdateCharacterFormComponentService
  ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.pageLoadingService.showLoadingIcon$;

    this.updateCharacterForm = this.formBuilder.group({
      characterName: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      characterServer: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] })
    });
  }

  submit(): void {
    this.showErrorValidations$.next(false);

    if (this.updateCharacterForm.valid) {
      let request: AccountUpdateRequest = {
        displayName: this.updateCharacterForm.get('displayName').value
      };

      this.dispatch(request);
    } else {
      this.showErrorValidations$.next(true);
    }
  }

  dispatch(dispatchData: AccountUpdateRequest): void {
    this.componentService
      .sendCharacterData(dispatchData)
      .pipe(take(1), takeUntil(this.unsubscribe$))
      .subscribe(response => {
        if (response) {
          this.authStateService.onAuthDataInfoUpdated(response.displayName);
          this.router.navigate(['/']);
        } else {
          this.showErrorValidations$.next(true);
        }
      });
  }
}
