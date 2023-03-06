import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './pages/template/template.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import { DialogComponent } from './components/dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { CreateUpdateTemplateComponent } from './components/create-update-template/create-update-template.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MonacoEditorModule} from "ngx-monaco-editor-v2";
import {MatDividerModule} from "@angular/material/divider";
import {CdkDropList} from "@angular/cdk/drag-drop";
import { TemplatesComponent } from './pages/templates/templates.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { HeaderComponent } from './components/header/header.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    DialogComponent,
    CreateUpdateTemplateComponent,
    TemplatesComponent,
    HeaderComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        ReactiveFormsModule,
        MonacoEditorModule.forRoot(),
        FormsModule,
        MatDividerModule,
        CdkDropList,
        MatExpansionModule,
        MatAutocompleteModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
