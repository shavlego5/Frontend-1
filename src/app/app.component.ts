import {Component} from '@angular/core';
import {ToggleDialogService} from "./core/services";
import {BaseService} from "./core/services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Frontend-1';
  showFiller = false;

  constructor(
    private dialog: ToggleDialogService,
    public baseService: BaseService,
  ) {
  }

  openDialog(content: string, title: string) {
    this.dialog.openDialog('300ms', '300ms', content, title)
  }
}
