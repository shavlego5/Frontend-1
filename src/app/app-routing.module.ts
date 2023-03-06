import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TemplateComponent} from "./pages/template/template.component";
import {TemplatesComponent} from "./pages/templates/templates.component";

const routes: Routes = [
  {
    path: '',
    component: TemplatesComponent
  },
  {
    path: 'template/:name',
    component: TemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
