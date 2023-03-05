import { Component } from '@angular/core';
import {ToggleDialogService} from "../../core/services/toggle-dialog.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(
    public dialog: ToggleDialogService
  ) {
  }
}
