import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PagesComponent} from "./pages.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PurchaseComponent} from "./purchase/purchase.component";
import {BasicdataComponent} from "./basicdata/basicdata.component";
import {SupplierformComponent} from "./basicdata/supplier/supplierform/supplierform.component";
import {ItemComponent} from "./basicdata/items/item/item.component";
import {ItemCategoryComponent} from "./basicdata/items/item-category/item-category.component";

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [],

    children: [

      {
        path: 'dashboard',
        component: DashboardComponent
      },{
        path: 'purchase',
        component: PurchaseComponent
      },{
        path: 'basicData',
        component: BasicdataComponent
      },{
        path: 'supplierForm',
        component: SupplierformComponent
      },{
        path: 'addItems',
        component: ItemComponent
      },{
        path: 'itemCategory',
        component: ItemCategoryComponent
      },

    ]
  }
  ]
    @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule],
    })
    export class PagesRoutingModule {
    }


