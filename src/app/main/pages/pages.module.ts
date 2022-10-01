import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputMaskModule} from 'primeng/inputmask';
import {NavbarComponent} from "./header-footer/navbar/navbar.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TooltipModule} from 'primeng/tooltip';
import {ChipsModule} from "primeng/chips";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {CheckboxModule} from "primeng/checkbox";
import {AppComponent} from "../../app.component";
import {PurchaseComponent} from './purchase/purchase.component';
import {BasicdataComponent} from './basicdata/basicdata.component';
import {SupplierformComponent} from './basicdata/supplier/supplierform/supplierform.component';
import {SuppliercategoryComponent} from './basicdata/supplier/suppliercategory/suppliercategory.component';
import {AutoCompleteModule} from "primeng/autocomplete";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { ItemComponent } from './basicdata/items/item/item.component';
import { ItemCategoryComponent } from './basicdata/items/item-category/item-category.component';

@NgModule({
  declarations: [PagesComponent, NavbarComponent, DashboardComponent, PurchaseComponent, BasicdataComponent, SupplierformComponent, SuppliercategoryComponent, ItemComponent, ItemCategoryComponent],

  imports: [
    ChipsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    TableModule,
    CalendarModule,
    InputMaskModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    InputSwitchModule,
    ConfirmDialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    TooltipModule,
    ScrollPanelModule,
    CheckboxModule,
    AutoCompleteModule,
  ],
  providers: [
  ],
  bootstrap: [PagesComponent]
})
export class PagesModule {
}
