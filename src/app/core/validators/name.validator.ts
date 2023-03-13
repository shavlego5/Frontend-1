import {FormControl, ValidatorFn} from "@angular/forms";
import {ITemplate} from "../interfaces/template";

export const nameValidator: ValidatorFn | any = (formControl: FormControl): any => {
    let templatesContainer = localStorage.getItem('templates') ? JSON.parse(localStorage.getItem('templates')!) : [];
    let nameExists = templatesContainer.some((template: ITemplate) => {
      return template.name === formControl?.value
    })
    return  nameExists ? { 'nameExists': true } : null;
}
