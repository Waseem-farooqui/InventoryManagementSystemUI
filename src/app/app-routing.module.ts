import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./main/pages/dashboard/dashboard.component";
import {LoginComponent} from "./helpers/login/login.component";
import {RegisterComponent} from "./helpers/register/register.component";
import {ForgetpasswordComponent} from "./helpers/forgetpassword/forgetpassword.component";

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgetpasswordComponent },
  { path: 'home', loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
