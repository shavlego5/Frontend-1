import {AbstractControl, ValidatorFn} from "@angular/forms";

export function minLengthValidator(length: number): ValidatorFn | any {
  return (control: AbstractControl) => {
    return control.value.trim().length < length ? {length: length} : null;
  }
}
