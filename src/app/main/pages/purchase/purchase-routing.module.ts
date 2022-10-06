import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PurchaseComponent} from "./purchase.component";
import {NewPurchaseComponent} from "./new-purchase/new-purchase.component";
import {PurchaseTableComponent} from "./purchase-table/purchase-table.component";

const routes: Routes = [
  {
    path: '', component: PurchaseComponent, children: [
      {
        path: 'DashBoard', component: NewPurchaseComponent
      },
      { path: 'List', component: PurchaseTableComponent },
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
export class PurchaseRoutingModule { }
