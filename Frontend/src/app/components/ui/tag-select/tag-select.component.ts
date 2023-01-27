import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-tag-select',
  templateUrl: './tag-select.component.html',
  styleUrls: ['./tag-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TagSelectComponent)
    }
  ]
})
export class TagSelectComponent implements ControlValueAccessor {
  @Output() onTagsChanged = new EventEmitter<string[]>();

  tagList: string[] = [];
  touched = false;
  disabled = false;
  tagAllowedCharacters = /[^a-z0-9+!#@\s]/gi;

  constructor() {}

  onChange = value => {};
  onTouched = () => {};

  writeValue(tags: string[]): void {
    this.tagList = [];

    tags.forEach(tag => this.tagList.push(tag));
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

  onTagAdd(event: any, didPressReturn: boolean) {
    let fieldValue: string = event.target.value;

    if (fieldValue.length > 1 && (didPressReturn || fieldValue.endsWith(','))) {
      this.markAsTouched();
      let trimmed = didPressReturn ? fieldValue : fieldValue.substring(0, fieldValue.length - 1);
      let fieldValueCleaned = trimmed.trim().replace(this.tagAllowedCharacters, '');

      event.target.value = '';

      if (!this.tagList.includes(fieldValueCleaned)) {
        this.addTag(fieldValueCleaned);
        this.onTagsChanged.emit(this.tagList);
      }
    }
  }

  removeTag(tag: string): void {
    if (this.tagList.includes(tag)) {
      let index = this.tagList.indexOf(tag);

      this.tagList.splice(index, 1);

      this.onTagsChanged.emit(this.tagList);
    }
  }

  private addTag(tag: string) {
    this.tagList.push(tag);
  }

  private markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
