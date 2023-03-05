import { Component } from '@angular/core';
import {ToggleDialogService} from "./core/services/toggle-dialog.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Frontend-1';
  showFiller = false;

  constructor(
    private dialog: ToggleDialogService
  ) {
  }

  openDialog(content: string, title: string) {
    this.dialog.openDialog('300ms', '300ms', content, title)
  }
}
