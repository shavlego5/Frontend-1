import {FormControl, ValidatorFn} from "@angular/forms";

export const emptyStringValidator: ValidatorFn | any = (formControl: FormControl): any => {
  const control = formControl.value
  return control === "".padStart(control.length, " ") ? {isEmptyString: true} : null;
}
