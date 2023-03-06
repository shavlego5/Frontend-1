import {Injectable} from '@angular/core';
import {ITemplate} from "../interfaces/template";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  templatesContainer: ITemplate[] = [];

  getData() {
    this.getItem('templates') ? this.templatesContainer = this.getItem('templates') : [];
  }

  setData() {
    this.setItem('templates', this.templatesContainer);
  }

  setItem(key: string, value: any) {
   return  localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key)!)
  }

  deleteItem(key: string){
    return localStorage.removeItem(key);
  }

  createNewTemplate(template: ITemplate) {
    this.templatesContainer = [template].concat(this.templatesContainer);
    //this.templatesContainer.push(template);
    this.setItem('templates', this.templatesContainer);
  }

  getTemplate(name: string) {
    let template: ITemplate | undefined;
    this.getData();
     template = this.templatesContainer.find((template: ITemplate) => {
      return  template.name === name ;
    })
    return template;
  }

  updateTemplate(name: string, template: ITemplate) {
    this.getData();
    let index = this.templatesContainer.findIndex((template: ITemplate) => {
      return template.name === name;
    })
    this.templatesContainer[index] = template;
    this.setData();
  }

  deleteTemplate(name: string) {
    this.getData();
    this.templatesContainer = this.templatesContainer.filter( (template: ITemplate) => {
      return template.name !== name;
    })
    this.setData();
  }
}
