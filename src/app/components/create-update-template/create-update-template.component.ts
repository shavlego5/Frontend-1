import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {emptyStringValidator, minLengthValidator, MyErrorStateMatcher} from "../../core/validators";

@Component({
  selector: 'app-create-update-template',
  templateUrl: './create-update-template.component.html',
  styleUrls: ['./create-update-template.component.scss']
})
export class CreateUpdateTemplateComponent {
  name = new FormControl('', [Validators.required, emptyStringValidator, minLengthValidator(2)]);
  description = new FormControl('', [Validators.required, emptyStringValidator, minLengthValidator(4)])

  form = new FormGroup({
    name: this.name,
    description: this.description
  })
  matcher = new MyErrorStateMatcher();
}
