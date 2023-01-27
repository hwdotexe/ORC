import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, UntypedFormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { BaseUnsubscribeComponent } from 'src/app/components/base-unsubscribe.component';

@Component({
  selector: '[formGroup] ui-form-error [errorFor][showErrors]',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css']
})
export class FormErrorComponent extends BaseUnsubscribeComponent implements OnInit {
  @Input() errorFor: string;
  @Input('showErrors') showErrors$: BehaviorSubject<boolean>;

  showErrors: boolean;

  parentForm: UntypedFormGroup;
  control: AbstractControl;
  errorMessage: string;

  constructor(private controlContainer: ControlContainer) {
    super();
  }

  ngOnInit(): void {
    this.parentForm = <UntypedFormGroup>this.controlContainer.control;
    this.control = this.parentForm.get(this.errorFor);

    this.showErrors$
      .pipe(
        tap(showErrors => {
          this.showErrors = showErrors;
          this.errorMessage = this.mapErrorMessage();
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  private mapErrorMessage(): string {
    if (this.control.hasError('required')) {
      return 'This field is required';
    }

    if (this.control.hasError('email')) {
      return 'Please enter a valid email address';
    }
  }
}
