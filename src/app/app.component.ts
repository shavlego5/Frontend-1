import {Component, OnInit} from '@angular/core';
import {ToggleDialogService} from "./core/services/toggle-dialog.service";
import {HandlebarsTemplateGeneratorService} from "./core/services/handlebars-template-generator.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Frontend-1';
  showFiller = false;

  constructor(
    private dialog: ToggleDialogService,
    private log: HandlebarsTemplateGeneratorService
  ) {
  }

  openDialog(content: string, title: string) {
    this.dialog.openDialog('300ms', '300ms', content, title)
  }

  ngOnInit() {
    this.log.log(this.log.data)
  }
}
