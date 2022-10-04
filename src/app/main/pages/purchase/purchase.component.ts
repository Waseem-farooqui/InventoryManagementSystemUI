import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddingItemUserService} from "../../../services/addingItemUser.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {GetAllDataService} from "../../../services/getAllData.Service";
import {Hotkey, HotkeysService} from "angular2-hotkeys";
import {Table} from "primeng/table";
import {autoCompleteServices} from "../../../services/autoCompleteServices";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  purchaseForm: FormGroup;
  submitted = false;
  active: any;
  supplierResponseResult: any;
  itemResponseResult: any;
  jobList: any = [];
  supplierLookUpName = [];
  supplierLookUpNameResult: any = [];
  itemLookUpName: any = [];
  itemLookUpNameResult: any = [];
  aliasLookUpName: any = [];
  aliasLookUpNameResult: any = [];
  itemQuantityArray: number[] = [];
  stockArray: number[] = [];
  purchasePrice: any = [];
  selectItemName: any = [];
  barcode: any = [];
  netTotalArray: number[] = [];
  purchaseFormNameArray: string[] = [];
  purchaseFormAliasArray: string[] = [];
  purchaseFormPurchasePriceArray: number[] = [];
  @ViewChild('dataTableShortListCandidate') table: Table;
  today = new Date();
  purchaseArrayName: string = 'purchaseArray'

  constructor(private formBuilder: FormBuilder, private addingService: AddingItemUserService,
              private toastr: ToastrService,
              private router: Router, private spinner: NgxSpinnerService,
              private allDataTableService: GetAllDataService,
              private hotkeysService: HotkeysService, private autoComlete: autoCompleteServices) {
    autoComlete.listOfAliasName = [];
  }

  ngOnInit(): void {
    this.active = [
      {name: true},
      {name: false},
    ]
    this.purchaseForm = this.formBuilder.group({
      invoice: [null],
      purchaseDate: [new Date()],
      goDown: ['Default G'],
      aliasName: [null],
      supplierName: [null, [Validators.required]],
      supplierInvoiceNumber: [null, [Validators.required]],
      grnNumber: [null],
      remarks: [null],
      printBal: [null],
      invSize: [null],
      orderCode: [null],
      orderDate: [new Date()],
      supplierOrderNumber: [null],
      purchaseArray: this.formBuilder.array([this.purchaseArray(null, null, null,
        0, new Date(), 1, null, null, null, 0, null, 0, null, 0)]),
      inventoryStock: [null],
      totalDiscountPercentage: [0],
      flatDisc: [0],
      miscValue: [0],
      inventoryGst: [0],
      totalStock: [null],
      purchaseExpance: [0],
      lastPurchasePrice: [null],
      avgPrice: [null],
      grandTotal: [null],

    });
    this.getJobList(true)
    this.getAllServices();
  }

  getTotalSumOfColumn(column) {
    return column.reduce((accumulator, objectColumn) => {
      return accumulator + objectColumn;
    }, 0);

  }

  onKey(event: any, index) {
    if (event.key === "Enter" && this.barcode[index] === undefined) {
      this.barcode[index] = event.target.value;
      this.addPurchaseRow();
    }

  }

  getPurchaseTableControlByIndex(tableIndex) {
    return this.purchaseForm.get(this.purchaseArrayName)['controls'][tableIndex].controls
  }

  populatePurchaseTableFields(aliasFormControl, tableIndex, type) {
    const tableControl = this.getPurchaseTableControlByIndex(tableIndex)
    const columValue = this.autoComlete.addNewElement(aliasFormControl.value)

    if (columValue === false) {
      this.toastr.error('Item already exist');
      tableControl.aliasNameTable.patchValue('')
    } else {
      this.selectItemName = this.itemResponseResult.find(item => item.name === aliasFormControl.value || item.alias === aliasFormControl.value)
      if (type === 'alias')
        this.purchaseFormNameArray[tableIndex] = tableControl.itemName.patchValue(this.selectItemName.name)
      else
        this.purchaseFormAliasArray[tableIndex] = tableControl.aliasNameTable.patchValue(this.selectItemName.alias)

      this.purchaseFormPurchasePriceArray[tableIndex] = tableControl.purchasPrice.patchValue(this.selectItemName.purchasePrice)
      this.stockArray[tableIndex] = this.selectItemName.quantity ? this.selectItemName.quantity : 0;
      this.itemPatchValue()
      this.patchPurchaseTable(tableIndex);
    }
  }

  itemPatchValue() {
    this.purchaseForm.patchValue({
      lastPurchasePrice: this.selectItemName.previousPurchasePrice,
      totalStock: this.getTotalSumOfColumn(this.stockArray),
    })
  }

  patchPurchaseTable(tableIndex) {
    const tableControl = this.getPurchaseTableControlByIndex(tableIndex);
    this.itemQuantityArray[tableIndex] = tableControl.qty.value;
    tableControl.netPrice.patchValue(tableControl.purchasPrice.value * tableControl.qty.value - tableControl.descountPrice.value);
    tableControl.descountPrice.patchValue((tableControl.netPrice.value / 100) * tableControl.descountPercentage.value)
    tableControl.descountPercentage.patchValue(tableControl.descountPrice.value / tableControl.netPrice.value * 100)
    tableControl.totalExcludingDiscount.patchValue(tableControl.netPrice.value - tableControl.descountPrice.value)
    tableControl.marginPercentage.patchValue(parseFloat(String((tableControl.retailPrice.value - tableControl.purchasPrice.value) / tableControl.purchasPrice.value * 100)).toFixed(1))
    this.netTotalArray[tableIndex] = tableControl.netPrice.value;
    this.purchaseForm.controls.grandTotal.patchValue(this.getTotalSumOfColumn(this.netTotalArray));
  }

  patchPurchaseForm(type) {
    const purchaseFormControl = this.purchaseForm.controls;
    const netTotal = this.getTotalSumOfColumn(this.netTotalArray)
    if (type === 'flat')
      purchaseFormControl.totalDiscountPercentage.patchValue(parseFloat(String((purchaseFormControl.flatDisc.value / netTotal) * 100)).toFixed(2));
    else
      purchaseFormControl.flatDisc.patchValue((netTotal / 100) * purchaseFormControl.totalDiscountPercentage.value);
    purchaseFormControl.grandTotal.patchValue((netTotal - parseInt(purchaseFormControl.flatDisc.value)) + purchaseFormControl.miscValue.value + purchaseFormControl.purchaseExpance.value);
  }

  patchSupplierAlias(name) {
    this.purchaseForm.patchValue({
      aliasName: (name.substring(0, 1) + name.substring(name.length, name.length - 1)).toUpperCase(),
    });
  }

  hotclick() {
    this.hotkeysService.add(new Hotkey('shift+g', (event: KeyboardEvent): boolean => {
      return true;
    }));
  }

  home() {
    this.router.navigate(['/basicData']);
  }

  get itemsAddsFormControl() {
    return this.purchaseForm.controls;
  }

  getAllServices() {
    this.addingService.getLookupName('SUPPLIER').subscribe(
      supplierResponse => {
        this.supplierResponseResult = supplierResponse;
        if (this.supplierResponseResult && this.supplierResponseResult.responseBody && this.supplierResponseResult.responseBody.length > 0) {
          this.supplierResponseResult = this.supplierResponseResult.responseBody;
          for (const valueSupplier of this.supplierResponseResult) {
            this.supplierLookUpName.push(valueSupplier.name);
          }
        } else {
          this.supplierLookUpName = [];
        }


      },
      err => {
        console.log(err);
      }
    );
    this.addingService.getLookupName('ITEM').subscribe(
      itemResponce => {
        this.itemResponseResult = itemResponce;
        if (this.itemResponseResult && this.itemResponseResult.responseBody && this.itemResponseResult.responseBody.length > 0) {
          this.itemResponseResult = this.itemResponseResult.responseBody;
          for (const valueItem of this.itemResponseResult) {
            this.itemLookUpName.push(valueItem.name);
          }
          for (const valueofAlias of this.itemResponseResult) {
            this.aliasLookUpName.push(valueofAlias.alias);
          }
        } else {
          this.itemLookUpName = [];
        }


      },
      err => {
        console.log(err)
      }
    );
  }

  searchSupplier(event): void {
    this.supplierLookUpNameResult = this.supplierLookUpName.filter(searchAlphbet => searchAlphbet.toLowerCase().startsWith(event.query.toLowerCase()));
  }

  searchItem(event): void {
    this.itemLookUpNameResult = this.itemLookUpName.filter(searchAlphbet => searchAlphbet.toLowerCase().startsWith(event.query.toLowerCase()));
  }

  searchAlias(event): void {
    this.aliasLookUpNameResult = this.aliasLookUpName.filter(searchAlphbet => searchAlphbet.toLowerCase().startsWith(event.query.toLowerCase()));
  }

  /*--------------Get Supplier All Data list------------------*/
  getJobList(bool) {
    this.allDataTableService.getPurchaseTable().subscribe(
      tableResponce => {
        this.jobList = tableResponce;
        this.jobList = this.jobList.profiles;
      },
      err => {
        // this.loading = false;
        this.spinner.hide('main-spinner');
        // this.toastr.error(err);

      }
    );
  }

  purchaseArray(aliasNameTable, itemName, packing, batch, expiryDate, qty, bonus, purchasPrice, totalExcludingDiscount, descountPercentage, descountPrice,
                retailPrice, netPrice, marginPercentage): FormGroup {
    return this.formBuilder.group({
      aliasNameTable: [aliasNameTable],
      itemName: [itemName],
      packing: [packing],
      batch: [batch],
      expiryDate: [expiryDate],
      qty: [qty],
      bonus: [bonus],
      purchasPrice: [purchasPrice],
      totalExcludingDiscount: [totalExcludingDiscount],
      descountPercentage: [descountPercentage],
      descountPrice: [descountPrice],
      retailPrice: [retailPrice],
      netPrice: [netPrice],
      marginPercentage: [marginPercentage],
    });
  }

  addPurchaseRow() {
    const purchaseRowcontrol = this.purchaseForm.controls.purchaseArray as FormArray;
    purchaseRowcontrol.push(this.purchaseArray(null, null, null,
      null, null, 1, null, null, null,
      null, null, null, null, null));
  }

  removesPurchaseRow(removePurchaseIndex) {
    const removePurchaseRowcontrol = this.purchaseForm.controls.purchaseArray as FormArray;
    removePurchaseRowcontrol.removeAt(removePurchaseIndex);
  }

  supplierNameOnSelect(supplierNamevalue) {
    const supplierObj = this.supplierResponseResult.find(t => t.name === supplierNamevalue.value);
    this.patchSupplierAlias(supplierObj.name)
  }


  onSubmit() {
    this.spinner.show('main-spinner');
    this.submitted = true;
    const value = this.purchaseForm.value;
    // stop here if form is invalid
    if (this.purchaseForm.invalid) {
      this.toastr.error('Please Fill the Mendotory Fields');
      return;
    }
    this.spinner.show('main-spinner');
    const result = {
      invoice: value.invoice,
      purchaseDate: value.purchaseDate,
      goDown: value.goDown,
      aliasName: value.aliasName,
      supplierName: value.supplierName,
      supplierInvoiceNumber: value.supplierInvoiceNumber,
      grnNumber: value.grnNumber,
      remarks: value.remarks,
      printBal: value.printBal,
      invSize: value.invSize,
      orderCode: value.orderCode,
      orderDate: value.orderDate,
      supplierOrderNumber: value.supplierOrderNumber,
      purchaseArray: {
        aliasNameTable: value.aliasNameTable,
        itemName: value.itemName,
        packing: value.packing,
        batch: value.packing,
        expiryDate: value.expiryDate,
        qty: value.qty,
        bonus: value.bonus,
        purchasPrice: value.purchasPrice,
        totalExcludingDiscount: value.totalExcludingDiscount,
        descountPercentage: value.descountPercentage,
        descountPrice: value.descountPrice,
        retailPrice: value.retailPrice,
        netPrice: value.netPrice,
        marginPercentage: value.marginPercentage,
      },
      inventoryStock: value.inventoryStock,
      totalDiscountPercentage: value.totalDiscountPercentage,
      flatDisc: value.flatDisc,
      miscValue: value.miscValue,
      inventoryGst: value.inventoryGst,
      totalStock: value.totalStock,
      purchaseExpance: value.purchaseExpance,
      lastPurchasePrice: value.lastPurchasePrice,
      avgPrice: value.avgPrice,
      grandTotal: value.grandTotal,

    }
    // this.addingService.addItemCategory(result).subscribe(
    //   res => {
    //     this.spinner.hide('main-spinner');
    //     this.itemCategoryResponce = res;
    //     if (this.itemCategoryResponce.statusCode === 201 || this.itemCategoryResponce.statusCode === 200){
    //       this.toastr.success(this.itemCategoryResponce.message);
    //       this.getJobList(true)
    //     }else if (this.itemCategoryResponce.statusCode === 208){
    //       this.toastr.warning(this.itemCategoryResponce.message);
    //     }else {
    //       this.toastr.error(this.itemCategoryResponce.message);
    //     }
    //   },
    //   error => {
    //     this.spinner.hide('main-spinner');
    //     if (error.error.message) {
    //       this.toastr.error(error.error.message);
    //     } else {
    //       this.toastr.error('Some problem occurred. Please try again.');
    //     }
    //   });
  }

}
