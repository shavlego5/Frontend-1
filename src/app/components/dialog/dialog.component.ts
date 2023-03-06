import {Component, OnInit} from '@angular/core';
import {BaseService, ToggleDialogService} from "../../core/services";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  constructor(
    public dialog: ToggleDialogService,
    private baseService: BaseService
  ) {
  }

  ngOnInit() {
    this.baseService.templatesContainer.find(template => {
      template.name === this.dialog.title ? this.codeJson = template.jsonForResult : null;
    })
  }

  delete(title: string) {
    this.baseService.deleteTemplate(title);
  }

  editorOptionsJson = {theme: 'vs-dark', language: 'json', minimap: {enabled: false}};
  codeJson: any = '{\n "_Put": "your JSON data here"\n}';

  saveJson(name: string) {
    this.baseService.templatesContainer.find(template => {
      template.name === name ? template.jsonForResult = this.codeJson : null;
    })
    this.baseService.setData();
  }
}
