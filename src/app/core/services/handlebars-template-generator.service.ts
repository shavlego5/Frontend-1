import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandlebarsTemplateGeneratorService {

  constructor() {
  }

  template: string = '';

  isArray = (data: any) => {
    return Array.isArray(data)
  }

  isObject = (data: any) => {
    return typeof data === "object" && data !== null && !Array.isArray(data);
  }

  isPureArray = (data: any) => {
    return !data.some((item: any) => {
      return this.isObject(item);
    })
  }

  isPureObject = (data: any) => {
    let is = true;
    for (const key in data) {
      if (this.isArray(data[key])) {
        is = false
      } else if (this.isObject(data[key])) {
        is = false
      }
    }

    return is;
  }

  isOnlyObjectsInArray = (data: any) => {
    return !data.some((item: any) => {
      return !this.isObject(item);
    })
  }

  pureObjectTemplate = (data: any, boolean?: boolean) => {
    let template = ''
    if (boolean) {
      for (let property in data) {
        template += `  {{${property}}}\n`
      }
    } else {
      for (let property in data[0]) {
        template += `  {{${property}}}\n`
      }
    }
    return template;
  }

  generate = (data: any) => {
    for (const key in data) {
      if (this.isArray(data[key])) {
        this.template += `{{#each ${key}}}\n`;
        if (this.isOnlyObjectsInArray(data[key]) && this.isPureObject(data[key][0])) {
          this.template += this.pureObjectTemplate(data[key])
          this.template += `{{/each}}\n`;
        } else if (this.isObject(data[key][0])) {
          this.generate(data[key][0])
          this.template += `{{/each}}\n`;
        } else {
          this.template += `  {{this}}\n`
          this.template += `{{/each}}\n`
        }
      } else if (!this.isArray(data[key]) && !this.isObject(data[key])) {
        this.template += `{{${key}}}\n`
      } else {
        this.template += `{{#with ${key}}}\n`;
        if (this.isPureObject(data[key])) {
          this.template += this.pureObjectTemplate(data[key], true)
          this.template += `{{/with}}\n`;
        } else if (this.isObject(data[key])) {
          this.generate(data[key][0])
          this.template += `{{/with}}\n`;
        } else {
          this.template += `  {{this}}\n`
          this.template += `{{/each}}\n`
        }
      }
    }
  }

  generateTemplate(data: any) {
    this.template = '';
    this.generate(data)
  }
}
