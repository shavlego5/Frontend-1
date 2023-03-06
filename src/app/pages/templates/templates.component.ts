import {Component, OnInit} from '@angular/core';
import {BaseService, ToggleDialogService} from "../../core/services";

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  constructor(
    public baseService: BaseService,
    private dialog: ToggleDialogService
  ) {
  }

  ngOnInit() {
    this.baseService.getData();
  }

  openDialog(content: string, title: string) {
    this.dialog.openDialog('300ms', '300ms', content, title)
  }
}
