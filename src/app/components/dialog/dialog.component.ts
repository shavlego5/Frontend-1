import { Component } from '@angular/core';
import {BaseService, ToggleDialogService} from "../../core/services";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(
    public dialog: ToggleDialogService,
    private baseService: BaseService
  ) {
  }

  delete(title: string) {
    this.baseService.deleteTemplate(title);
  }
}
