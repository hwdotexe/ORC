import { Component, EventEmitter, forwardRef, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ClubHoursAdding } from 'src/app/models/club-hours-adding.interface';

@Component({
  selector: 'app-select-variable-time-form',
  templateUrl: './select-variable-time-form.component.html',
  styleUrls: ['./select-variable-time-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectVariableTimeFormComponent)
    }
  ]
})
export class SelectVariableTimeFormComponent implements OnInit, ControlValueAccessor {
  @Output() onHoursChanged = new EventEmitter<ClubHoursAdding[]>();

  selectVariableTimeForm: UntypedFormGroup;
  hoursList: ClubHoursAdding[] = [];

  touched = false;
  disabled = false;

  showErrorValidations$ = new BehaviorSubject<boolean>(false);

  constructor(private formBuilder: UntypedFormBuilder) {}

  onChange = value => {};
  onTouched = () => {};

  ngOnInit(): void {
    this.selectVariableTimeForm = this.formBuilder.group({
      dayOfWeek: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      timeOpen: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] })
    });
  }

  writeValue(hours: ClubHoursAdding[]): void {
    this.hoursList = [];

    hours.forEach(h => {
      if (h.variableDay) {
        this.hoursList.push(h);
      }
    });
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  submit(): void {
    this.showErrorValidations$.next(false);

    if (this.selectVariableTimeForm.valid) {
      this.hoursList.push({
        variableDay: this.selectVariableTimeForm.get('dayOfWeek').value,
        variableTimes: this.selectVariableTimeForm.get('timeOpen').value
      });

      this.markAsTouched();

      this.onHoursChanged.emit(this.hoursList);
    } else {
      this.showErrorValidations$.next(true);
    }
  }

  deleteTime(hour: ClubHoursAdding): void {
    var index = this.hoursList.indexOf(hour);

    this.hoursList.splice(index, 1);

    this.onHoursChanged.emit(this.hoursList);
  }

  private markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
