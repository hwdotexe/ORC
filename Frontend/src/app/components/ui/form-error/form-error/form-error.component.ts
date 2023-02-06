import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, NgForm, UntypedFormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'ui-form-error [form][errorFor]',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css']
})
export class FormErrorComponent implements OnInit {
  @Input() errorFor: string;
  @Input() form: NgForm;

  errorMessage$: Observable<string>;
  control: AbstractControl;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    let parentForm = <UntypedFormGroup>this.controlContainer.control;
    this.control = parentForm.get(this.errorFor);

    this.errorMessage$ = this.form.ngSubmit.pipe(map(() => this.mapErrorMessage()));
  }

  private mapErrorMessage(): string {
    if (this.control.hasError('required')) {
      return 'This field is required';
    }

    if (this.control.hasError('email')) {
      return 'Please enter a valid email address';
    }

    return null;
  }
}
