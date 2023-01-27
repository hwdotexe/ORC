import { DatePipe } from '@angular/common';
import { Component, EventEmitter, forwardRef, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ClubHoursAdding } from 'src/app/models/club-hours-adding.interface';

@Component({
  selector: 'app-select-time-form',
  templateUrl: './select-time-form.component.html',
  styleUrls: ['./select-time-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectTimeFormComponent)
    }
  ]
})
export class SelectTimeFormComponent implements OnInit, ControlValueAccessor {
  @Output() onHoursChanged = new EventEmitter<ClubHoursAdding[]>();

  selectTimeForm: UntypedFormGroup;
  hoursList: ClubHoursAdding[] = [];

  touched = false;
  disabled = false;

  showErrorValidations$ = new BehaviorSubject<boolean>(false);

  constructor(private formBuilder: UntypedFormBuilder) {}

  onChange = value => {};
  onTouched = () => {};

  ngOnInit(): void {
    this.selectTimeForm = this.formBuilder.group({
      dayOfWeek: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      timeOpens: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      timeCloses: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] }),
      timezone: this.formBuilder.control('', { updateOn: 'submit', validators: [Validators.compose([Validators.required])] })
    });
  }

  writeValue(hours: ClubHoursAdding[]): void {
    this.hoursList = [];

    hours.forEach(h => {
      if (!h.variableDay) {
        if (!h.timezoneID) {
          var hAdding: ClubHoursAdding = {
            day: h.day,
            open: new DatePipe('en', 'UTC').transform(h.open, 'h:mm aa'),
            close: new DatePipe('en', 'UTC').transform(h.close, 'h:mm aa'),
            timezoneID: 'UTC'
          };

          this.hoursList.push(hAdding);

          this.onHoursChanged.emit(this.hoursList);
        } else {
          this.hoursList.push(h);
        }
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

    if (this.selectTimeForm.valid) {
      this.hoursList.push({
        day: this.selectTimeForm.get('dayOfWeek').value,
        open: this.selectTimeForm.get('timeOpens').value,
        close: this.selectTimeForm.get('timeCloses').value,
        timezoneID: this.selectTimeForm.get('timezone').value
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
