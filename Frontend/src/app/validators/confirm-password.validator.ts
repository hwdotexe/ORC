import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(toMatch: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const toMatchValue = toMatch.value;
    const value = control.value;

    if (!value || !toMatchValue) {
      return null;
    }

    return value !== toMatchValue ? { confirmPassword: true } : null;
  };
}
