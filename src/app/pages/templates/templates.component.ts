import {AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {BaseService, ToggleDialogService} from "../../core/services";
import {MatExpansionPanel} from "@angular/material/expansion";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    public baseService: BaseService,
    private dialog: ToggleDialogService
  ) {
  }

  ngOnInit() {
    this.baseService.getData();
  }

  private sub$ = new Subject();

  @ViewChildren(MatExpansionPanel) expansions!: QueryList<MatExpansionPanel>;

  ngAfterViewInit() {
    this.expansions.forEach( expansion => {
      expansion.opened
        .pipe(takeUntil(this.sub$))
        .subscribe( x => {
          this.expansions.filter(exp => exp !== expansion).forEach(exp => exp.close());
      })
    })
  }

  openDialog(content: string, title: string) {
    this.dialog.openDialog('300ms', '300ms', content, title)
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
