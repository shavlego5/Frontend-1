import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../components/dialog/dialog.component";

@Injectable({
  providedIn: 'root'
})
export class ToggleDialogService {
  constructor(public dialog: MatDialog) {}

  content?: string;

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, content: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });

    this.content = content;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
