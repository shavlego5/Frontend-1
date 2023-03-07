import {Component} from '@angular/core';
import {BaseService} from "../../core/services";
import {ITemplate} from "../../core/interfaces/template";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private baseService: BaseService
  ) {
  }

  search(event: any) {
    let templates: ITemplate[] = this.baseService.getItem('templates');
    this.baseService.templatesContainer = templates.filter(template => {
      return template.name?.includes(event.target.value)
    })
  }
}
