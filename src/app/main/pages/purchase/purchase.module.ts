import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { NewPurchaseComponent } from './new-purchase/new-purchase.component';
import {ChipsModule} from "primeng/chips";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PagesRoutingModule} from "../pages-routing.module";
import {TableModule} from "primeng/table";
import {CalendarModule} from "primeng/calendar";
import {InputMaskModule} from "primeng/inputmask";
import {SliderModule} from "primeng/slider";
import {DialogModule} from "primeng/dialog";
import {MultiSelectModule} from "primeng/multiselect";
import {ContextMenuModule} from "primeng/contextmenu";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {InputTextModule} from "primeng/inputtext";
import {ProgressBarModule} from "primeng/progressbar";
import {InputSwitchModule} from "primeng/inputswitch";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TooltipModule} from "primeng/tooltip";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {CheckboxModule} from "primeng/checkbox";
import {AutoCompleteModule} from "primeng/autocomplete";
import {MatAutocompleteModule} from "@angular/material/autocomplete";


@NgModule({
  declarations: [
    NewPurchaseComponent,
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
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
    MatAutocompleteModule,
  ]
})
export class PurchaseModule { }
