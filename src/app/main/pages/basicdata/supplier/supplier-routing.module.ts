import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SupplierDashboardComponent} from "./supplier-dashboard/supplier-dashboard.component";
import {SupplierComponent} from "./supplierform/supplier.component";
import {SupplierListComponent} from "./supplier-list/supplier-list.component";

const routes: Routes = [
  {
    path: '', component: SupplierDashboardComponent, children: [
      {
        path: 'DashBoard', component: SupplierComponent
      },
      { path: 'List', component: SupplierListComponent },
      {
        path: '', redirectTo: 'DashBoard', pathMatch: 'full'
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
