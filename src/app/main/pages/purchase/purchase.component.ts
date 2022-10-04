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
  registerForm: FormGroup;
  submitted = false;
  active: any;
  supplierResponseResult: any;
  itemResponseResult: any;
  jobList: any = [];
  supplierLookUpName = [];
  supplierResult = [];
  supplierLookUpNameResult: any = [];
  itemLookUpName: any = [];
  itemLookUpNameResult: any = [];
  aliasLookUpName: any = [];
  aliasLookUpNameResult: any = [];
  quantityItem: any = [];
  netTotalPrice: any = [];
  purchasePrice: any = [];
  discountPrcnt: any = [];
  retailPriceTable: any = [];
  retailNetPriceTable: any = [];
  supplierObj: any = [];
  selectItemName: any = [];
  barcode: any = [];
  purchaseArrayStore: any = [];
  @ViewChild('dataTableShortListCandidate') table: Table;
  today = new Date();

  constructor(private formBuilder: FormBuilder, private addingService: AddingItemUserService, private toastr: ToastrService,
              private router: Router, private spinner: NgxSpinnerService, private allDataTableService: GetAllDataService,
              private hotkeysService: HotkeysService, private autoComlete: autoCompleteServices) {
    autoComlete.listOfAliasName = [];
  }

  ngOnInit(): void {
    this.active = [
      {name: true},
      {name: false},
    ]
    this.registerForm = this.formBuilder.group({
      invoice: [null],
      purchaseDate: [null],
      goDown: ['Default G'],
      aliasName: [null],
      supplierName: [null, [Validators.required]],
      supplierInvoiceNumber: [null, [Validators.required]],
      grnNumber: [null],
      remarks: [null],
      printBal: [null],
      invSize: [null],
      orderCode: [null],
      orderDate: [null],
      supplierOrderNumber: [null],
      purchaseArray: this.formBuilder.array([this.purchaseArray(null, null, null,
        null, null, 1, null, null, null, null, null, null, null, null)]),
      inventoryStock: [null],
      totalDiscountPercentage: [null],
      flatDisc: [null],
      miscValue: [null],
      inventoryGst: [null],
      totalStock: [null],
      purchaseExpance: [null],
      lastPurchasePrice: [null],
      avgPrice: [null],
      grandTotal: [null],

    });
    this.getJobList(true)
    this.getAllServices();
  }

  quanitityFocusOut(quantityValue, quantityIndex) {
    this.quantityItem[quantityIndex] = quantityValue.value;
    let quantityObject = this.getTotalSumOfColumn(this.quantityItem);
  }
  netPriceFocusOut(valueNetPrice, indexNetPrice) {
    this.retailNetPriceTable[indexNetPrice] = valueNetPrice.value
    let netPriceObject = this.getTotalSumOfColumn(this.retailNetPriceTable)
    console.log(netPriceObject)
  }

  purchaseFocusOut(purchaseValue, purchaseIndex) {
    this.purchasePrice[purchaseIndex] = purchaseValue.value;
  }


  getTotalSumOfColumn(column) {
    return column.reduce((accumulator, objectColumn) => {
      return accumulator + objectColumn;
    }, 0);

  }
  discountPercentages(value, i) {
    this.discountPrcnt[i] = value.value;
  }

  retailPriceFocusOut(valueRetailPrice, ValueRetailPriceIndex) {
    this.retailPriceTable[ValueRetailPriceIndex] = valueRetailPrice.value;
  }




  onKey(event: any, index) {
    if (event.key === "Enter" && this.barcode[index] === undefined) {
      this.barcode[index] = event.target.value;
      this.addPurchaseRow();
    }

  }

  addDatalist(addDatavalue, addDataListIndex) {
    const formValue = this.registerForm.get('purchaseArray')['controls'][addDataListIndex];
    const res = this.autoComlete.addNewElement(addDatavalue.value);

    if (res === false) {
      this.toastr.error('Item already exist');
      formValue.controls.aliasNameTable.patchValue('')
    } else {
      this.selectItemName = this.itemResponseResult.find(item => item.name === addDatavalue.name || item.alias === addDatavalue.value)
      this.registerForm.get('purchaseArray')['controls'][addDataListIndex].controls.itemName.patchValue(this.selectItemName.name)
      this.registerForm.get('purchaseArray')['controls'][addDataListIndex].controls.purchasPrice.patchValue(this.selectItemName.purchasePrice)
      this.itemPatchValue()
    }
  }

  itemPatchValue() {
    this.registerForm.patchValue({
      lastPurchasePrice: this.selectItemName.previousPurchasePrice,
      totalStock: this.selectItemName.quantity,
    })
  }

  patchSupplierID() {
    this.registerForm.patchValue({
      invoice: this.supplierObj.id,
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
    return this.registerForm.controls;
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
    const purchaseRowcontrol = this.registerForm.controls.purchaseArray as FormArray;
    purchaseRowcontrol.push(this.purchaseArray(null, null, null,
      null, null, 1, null, null, null,
      null, null, null, null, null));
  }

  removesPurchaseRow(removePurchaseIndex) {
    const removePurchaseRowcontrol = this.registerForm.controls.purchaseArray as FormArray;
    removePurchaseRowcontrol.removeAt(removePurchaseIndex);
  }

  supplierNameOnSelect(supplierNamevalue) {
    this.supplierObj = this.supplierResponseResult.find(t => t.name === supplierNamevalue.value);
    this.patchSupplierID()
  }


  onSubmit() {
    this.spinner.show('main-spinner');
    this.submitted = true;
    const value = this.registerForm.value;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
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
