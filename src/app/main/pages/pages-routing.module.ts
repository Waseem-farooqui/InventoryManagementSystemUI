import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PagesComponent} from "./pages.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PurchaseComponent} from "./purchase/purchase.component";
import {BasicdataComponent} from "./basicdata/basicdata.component";
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
        path: 'purchase',  loadChildren: () => import('./purchase/purchase.module').then(m =>m.PurchaseModule)
      },{
        path: 'basicData',
        component: BasicdataComponent
      },{
        path: 'supplier',  loadChildren: () => import('./basicdata/supplier/supplier.module').then(m =>m.SupplierModule)
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


