import { Component, Input, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { FormName } from 'src/app/models/enum/form-name.enum';
import { FormError } from 'src/app/models/form-validation-error.interface';
import { AppDetailsStateService } from 'src/app/store/app-details-state/app-details-state.service';

@Component({
  selector: 'ui-form-error [formName]',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css']
})
export class FormErrorComponent implements OnInit {
  @Input() formName: FormName;

  formErrors$: Observable<FormError[]>;

  constructor(private appDetailsStateService: AppDetailsStateService) {}

  ngOnInit(): void {
    this.formErrors$ = this.appDetailsStateService.formErrors$.pipe(
      filter(formErrors => !!formErrors),
      map(formErrors => formErrors.filter(error => error.form === this.formName))
    );
  }
}
