import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {emptyStringValidator, minLengthValidator, MyErrorStateMatcher} from "../../core/validators";

@Component({
  selector: 'app-create-update-template',
  templateUrl: './create-update-template.component.html',
  styleUrls: ['./create-update-template.component.scss']
})
export class CreateUpdateTemplateComponent {

  @ViewChild('upload') upload!: ElementRef;

  constructor(

  ) {
  }

  name = new FormControl('', [Validators.required, emptyStringValidator, minLengthValidator(2)]);
  description = new FormControl('', [Validators.required, emptyStringValidator, minLengthValidator(4)])

  form = new FormGroup({
    name: this.name,
    description: this.description
  })
  matcher = new MyErrorStateMatcher();

  editorOptionsHandlebars = {theme: 'vs-dark', language: 'handlebars', minimap: { enabled: false }};
  editorOptionsJson = {theme: 'vs-dark', language: 'json', minimap: { enabled: false }};
  codeHandlebars: string = '{{! Enter Handlebars Template Here }}\n';
  codeJson:  any = '{\n "_Put": "your JSON data here"\n}';

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDragEnter(event: any) {
    event.preventDefault();
  }

  onDragLeave(event: any) {
    event.preventDefault();
  }

  onDrop(event: any) {
    event.preventDefault();
    const file: any = event.dataTransfer.files.item(0);
    console.log(event.dataTransfer.files)
    this.readFile(file);
  }

  uploaded(event: any) {
    this.readFile(event.target.files[0])
  }

  readFile(file: any) {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      file.type === 'application/json' ? this.codeJson = reader.result : this.notJson();

      this.generateTemplate(reader.result)
    };
  }

  notJson() {
    this.codeJson = '{\n "_ERROR": "Uploaded file type is not JSON!"\n}';
    setTimeout(()=> {
      this.codeJson ='{\n "_ERROR": "Uploaded file type is not JSON!",\n "_Put": " JSON data only!"\n}';
    },1000)
  }

  log(event: any) {
    console.log(event.target.value)
  }

  generateTemplate(file: any) {
    const model = file;
  }
}
