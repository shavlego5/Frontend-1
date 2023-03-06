import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {emptyStringValidator, minLengthValidator, MyErrorStateMatcher} from "../../core/validators";
import {BaseService, HandlebarsTemplateGeneratorService} from "../../core/services";
import {CreateNewTemplateService} from "../../core/services";
import {ITemplate} from "../../core/interfaces/template";
import {CurrentDateService} from "../../core/services";
import {nameValidator} from "../../core/validators/name.validator";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-create-update-template',
  templateUrl: './create-update-template.component.html',
  styleUrls: ['./create-update-template.component.scss']
})
export class CreateUpdateTemplateComponent implements OnInit {

  @ViewChild('upload') upload!: ElementRef;

  constructor(
    private templateGenerator: HandlebarsTemplateGeneratorService,
    private baseService: BaseService,
    private createNew: CreateNewTemplateService,
    private time: CurrentDateService,
    private dialog: MatDialog
  ) {
  }

  @Input('content') content!: string;
  @Input('name') editName!: string;

  jsonData: any;

  ngOnInit() {
    this.jsonData = this.baseService.getItem('json-data');

    if (this.jsonData) {
      this.codeJson = this.jsonData;
      this.contentChanged(this.jsonData);
    }

    let template: ITemplate | undefined;
    if(this.content === 'edit') {
      template = this.baseService.getTemplate(this.editName);
      this.form.get('name')?.setValue(template!.name);
      this.form.get('description')?.setValue(template!.description);
      this.codeHandlebars = template?.handlebars;
      this.codeJson = template?.json
    }
  }

  name = new FormControl('', [Validators.required, emptyStringValidator, minLengthValidator(2), nameValidator]);
  description = new FormControl('', [Validators.required, emptyStringValidator, minLengthValidator(4)]);


  form = new FormGroup({
    name: this.name,
    description: this.description
  })
  matcher = new MyErrorStateMatcher();

  editorOptionsHandlebars = {theme: 'vs-dark', language: 'handlebars', minimap: {enabled: false}};
  editorOptionsJson = {theme: 'vs-dark', language: 'json', minimap: {enabled: false}};
  codeHandlebars: any = '{{! Enter Handlebars Template Here }}\n';
  codeJson: any = '{\n "_Put": "your JSON data here"\n}';

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
    };
  }

  notJson() {
    this.codeJson = '{\n "_ERROR": "Uploaded file type is not JSON!"\n}';
    setTimeout(() => {
      this.codeJson = '{\n "_ERROR": "Uploaded file type is not JSON!",\n "_Put": " JSON data only!"\n}';
    }, 1000)
  }


  contentChanged(event: any) {
    this.baseService.setItem('json-data', event);
    this.templateGenerator.generateTemplate(JSON.parse(event));
    this.codeHandlebars = this.templateGenerator.template
  }

  reset() {
    this.form.get('name')?.setValue('');
    this.form.get('description')?.setValue('');
    this.codeJson = '{\n "_Put": "your JSON data here"\n}';
    setTimeout(()=>{
      this.codeHandlebars = '{{! Enter Handlebars Template Here }}\n';
    },100);
  }

  create() {
    this.form.markAllAsTouched();
    if(this.form.valid && this.codeHandlebars !== '{{! Enter Handlebars Template Here }}\n') {
      let template: ITemplate = {
        name: this.form.get('name')!.value,
        description: this.form.get('description')!.value,
        createdAt: this.time.fullDate,
        updatedAt: false,
        handlebars: this.codeHandlebars,
        json: this.codeJson
      }
      this.baseService.createNewTemplate(template);
      this.reset();
      this.dialog.closeAll();
    } else {
      alert('Please enter all required data!')
    }
  }

  edit() {
    let currentTemplate = this.baseService.getTemplate(this.editName);
    this.form.markAllAsTouched();
    if(this.form.valid && this.codeHandlebars !== '{{! Enter Handlebars Template Here }}\n') {
      let template: ITemplate = {
        name: this.form.get('name')!.value,
        description: this.form.get('description')!.value,
        createdAt: currentTemplate!.createdAt,
        updatedAt: this.time.fullDate,
        handlebars: this.codeHandlebars,
        json: this.codeJson
      }
      this.baseService.updateTemplate(String(currentTemplate!.name), template);
      this.reset();
      this.dialog.closeAll();
    } else {
      alert('Please enter all required data!')
    }
  }
}
