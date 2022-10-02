import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenubarModule} from 'primeng/menubar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './helpers/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {RegisterComponent} from './helpers/register/register.component';
import {ForgetpasswordComponent} from './helpers/forgetpassword/forgetpassword.component';
import {AutoCompleteModule} from "primeng/autocomplete";
import {DropdownModule} from "primeng/dropdown";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MessagesModule} from 'primeng/messages';
import {PagesModule} from "./main/pages/pages.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AddingItemUserService} from "./services/addingItemUser.service";
import {ConfigApiService} from "./services/configApi.service";
import {GetAllDataService} from "./services/getAllData.Service";
import { ToastrModule } from 'ngx-toastr';
import {HotkeyModule} from 'angular2-hotkeys';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgetpasswordComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    FormsModule,
    PagesModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    DropdownModule,
    MessagesModule,
    ToastrModule.forRoot(),
    HotkeyModule.forRoot(),


  ],
  providers: [HttpClient, AddingItemUserService, ConfigApiService, GetAllDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
