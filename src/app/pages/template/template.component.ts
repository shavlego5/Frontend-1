import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
//import * as Handlebars from 'handlebars';
import {ITemplate} from "../../core/interfaces/template";
import {BaseService} from "../../core/services";
import * as handlebars from "handlebars";

const Handlebars = require('handlebars/dist/handlebars.min');

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, AfterViewInit {

  template!: ITemplate;
  handlebars: any;

  constructor(
    private route: ActivatedRoute,
    private baseService: BaseService
  ) {
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    this.baseService.getData();
    this.baseService.templatesContainer.find(template => {
      console.log(template.name)
      return template.name === name ? this.template = template : null;
    })

    console.log(this.template.handlebars)

    const handlebars = String(this.template.handlebars);
    const compiledTemplate = Handlebars.compile(handlebars);
    const context = JSON.parse(this.template.jsonForResult!);

    this.handlebars = compiledTemplate(context);

    console.log(JSON.parse(this.template.jsonForResult!))
  }
}
