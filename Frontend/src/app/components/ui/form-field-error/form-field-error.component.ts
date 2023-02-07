import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, NgForm, UntypedFormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'ui-form-field-error [form][errorFor]',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {
  @Input() errorFor: string;
  @Input() form: NgForm;

  errorMessages$: Observable<string[]>;
  control: AbstractControl;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    let parentForm = <UntypedFormGroup>this.controlContainer.control;
    this.control = parentForm.get(this.errorFor);

    this.errorMessages$ = this.form.ngSubmit.pipe(map(() => this.mapErrorMessage()));
  }

  private mapErrorMessage(): string[] {
    var errors = [];

    if (this.control.hasError('required')) {
      errors.push('This field is required');
    }

    if (this.control.hasError('email')) {
      errors.push('Please enter a valid email address');
    }

    if (this.control.hasError('passwordStrength')) {
      errors.push('Passwords must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character');
    }

    if (this.control.hasError('confirmPassword')) {
      errors.push('Passwords do not match');
    }

    if (this.control.hasError('minlength')) {
      errors.push('Passwords must be at least 8 characters long');
    }

    return errors;
  }
}
