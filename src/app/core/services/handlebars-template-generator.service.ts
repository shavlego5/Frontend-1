import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import * as stream from "stream";

@Injectable({
  providedIn: 'root'
})
export class HandlebarsTemplateGeneratorService {

  constructor() {
  }

  data = {
    "Description": "Test Model",
    "Items": [
      {
        "Name": "ItemA",
        "Description": "Item - A",
        "Options": [
          {"Id": "A", "Description": "Option A"},
          {"Id": "B", "Description": "Option B"}
        ]
      },
      {
        "Name": "ItemB",
        "Description": "Item - B",
        "Options": [
          {"Id": "C", "Description": "Option C"},
          {"Id": "D", "Description": "Option D", "ddddddd":["sdsdsd","sdsdsdsdsds"]}
        ]
      }
    ],
    "List": [
      {
        "Id": "ListItem1",
        "Description": "List Item - 1"
      },
      {
        "Id": "ListItem2",
        "Description": "List Item - 2"
      },
      {
        "Id": "ListItem3",
        "Description": "List Item - 3"
      }
    ]
  };

  template: string = '';

  params = {
    string: ``,
    array: ``,
    object: ``
  };

  parameters = (key: any, value?: any) => {

    let properties = ``;

    if(value){
      for(let property in value){
       properties += `{{${key}.${property}}}\n`;
      }
    }

    let templates = {
      string: `{{${key}}}\n`,
      array: `{{#each ${value}}}
                    {{this}}
               {{/each}}\n`,
      object: `{{#with ${key}}}
                     ${properties}
               {{/with}}\n`
    };

    return this.params = templates;
  }

  checkArray(property: any, name?: string) {
    property.forEach((item: any)=>{
      if(typeof item === 'string' || typeof item === 'number'|| typeof item === null || typeof item === 'boolean') {
        this.parameters(item);
        this.template += this.params.string;
      }
      if(item.length >= 0 && typeof item !== "string"){
        this.checkArray(item)
      }
      if(item.length === undefined && typeof item !== "number" && typeof item !== "boolean") {
        let pureObject = true;
         for(let property in item){
           if(typeof item[property] !== 'string' && typeof item[property] !== 'number'&& typeof item[property] !== null && typeof item[property] !== 'boolean') {
             pureObject = false
           }
         }
         if(!pureObject){
           this.checkObject(item);
         }
         if(pureObject) {
           this.parameters(name, item);
           this.template += this.params.object;
         }
      }
    })
  }

  checkObject(object: any) {
      for(let property in object){
        if(typeof object[property] === 'string' ||typeof object[property] === 'number'|| typeof object[property] === null || typeof object[property] === 'boolean') {
          this.parameters(property);
          this.template += this.params.string;
        }
        if(object[property].length === undefined && typeof object[property] !== "number" && typeof object[property] !== "boolean") {
          // object
          this.checkObject(object[property])
        }
        if(object[property].length >= 0 && typeof object[property] !== "string"){ // array
          let pureArray = true;
          object[property].forEach((arr: any) => {
            if(typeof arr !== 'string' && typeof arr !== 'number'&& typeof arr !== null && typeof arr !== 'boolean') {
              console.log(555555555555555555555)
              pureArray = false;
            }
          })
          console.log(pureArray)
          if(!pureArray){
            this.checkArray(object[property], property)
          }
          if(pureArray){
            console.log(object[property])
            this.parameters(null, property);
            this.template += this.params.array;
          }
        }
      }
  }




  log(data: any) {
    if (data.length === undefined && typeof data !== "number" && typeof data !== "boolean") {
      this.checkObject(data);
    } else if (data.length >= 0 && typeof data !== "string") {
      this.checkArray(data)
    }
  }
}
