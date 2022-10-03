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
  supplierResponceResult: any;
  itemCategoryResponce: any;
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

  SupplierLookUpArray: any;
  ItemLookUpArray: any;
  barcode: any = [];
  @ViewChild('dataTableShortListCandidate') table: Table;
  today = new Date();
  jstoday = '';

  constructor(private formBuilder: FormBuilder, private addingService: AddingItemUserService, private toastr: ToastrService,
              private router: Router, private spinner: NgxSpinnerService, private allDataTableService: GetAllDataService,
              private hotkeysService: HotkeysService, private autoComlete:autoCompleteServices) {
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
    console.log(quantityIndex)
    console.log(quantityValue)
    this.quantityItem[quantityIndex] = quantityValue.value;
    console.log(this.quantityItem[quantityIndex]);
    let quantityObject = this.getTotalSumOfColumn(this.quantityItem);
    console.log(quantityObject)
  }

  purchaseFocusOut(purchaseValue, purchaseIndex) {
    this.purchasePrice[purchaseIndex] = purchaseValue.value;
    console.log(this.purchasePrice[purchaseIndex]);
    console.log(this.getTotalSumOfColumn(this.purchasePrice));
    this.sumInNetPrice(purchaseIndex);
  }


  getTotalSumOfColumn(column) {
    return column.reduce((accumulator, objectColumn) => {
      return accumulator + objectColumn;
    }, 0);

  }

  sumInNetPrice(i) {
    // this.netTotalPrice = this.registerForm.get('purchaseArray')['controls'][i].get('netPrice');
    console.log(this.netTotalPrice);
  }

  discountPercentages(value, i) {
    this.discountPrcnt[i] = value.value;
    console.log(value.value)
    console.log(i)
  }

  retailPriceFocusOut(valueRetailPrice, ValueRetailPriceIndex) {
    this.retailPriceTable[ValueRetailPriceIndex] = valueRetailPrice.value;
  }

  onchangeValue(valueNetPrice, indexNetPrice) {
    this.retailNetPriceTable[indexNetPrice] = valueNetPrice.value
    console.log(valueNetPrice.value)
  }


  onKey(event: any, index) {
    if (event.key === "Enter" && this.barcode[index] === undefined) {
      this.barcode[index] = event.target.value;
      this.addPurchaseRow();
      console.log(this.barcode)
    }

  }

  addDatalist(addDatavalue, addDataListIndex) {
    const formValue = this.registerForm.get('purchaseArray')['controls'][addDataListIndex];
    const res=this.autoComlete.addNewElement(addDatavalue.value);
    if (res === false){
      this.toastr.error('Item already exist');
      formValue.controls.aliasNameTable.patchValue('')
    }
    console.log(res);
  }

  hotclick() {
    this.hotkeysService.add(new Hotkey('shift+g', (event: KeyboardEvent): boolean => {
      console.log('Typed hotkey');
      return true;
    }));
  }

  home() {
    this.router.navigate(['/dashboard']);
  }

  get itemsAddsFormControl() {
    return this.registerForm.controls;
  }

  getAllServices() {
    this.addingService.getLookupName('SUPPLIER').subscribe(
      supplierResponce => {
        this.supplierResponceResult = supplierResponce;
        this.SupplierLookUpArray = supplierResponce
        if (this.supplierResponceResult && this.supplierResponceResult.responseBody && this.supplierResponceResult.responseBody.length > 0) {
          this.supplierResponceResult = this.supplierResponceResult.responseBody;
          this.supplierResult = this.supplierResponceResult.responseBody;
          for (const valueSupplier of this.supplierResponceResult) {
            console.log(valueSupplier)
            this.supplierLookUpName.push(valueSupplier.name);

          }
        } else {
          this.supplierLookUpName = [];
        }


      },
      err => {


      }
    );
    this.addingService.getLookupName('ITEM').subscribe(
      itemResponce => {
        this.supplierResponceResult = itemResponce;
        this.ItemLookUpArray = itemResponce
        if (this.supplierResponceResult && this.supplierResponceResult.responseBody && this.supplierResponceResult.responseBody.length > 0) {
          this.supplierResponceResult = this.supplierResponceResult.responseBody;
          for (const valueItem of this.supplierResponceResult) {
            this.itemLookUpName.push(valueItem.name);

          }
          for (const valueofAlias of this.supplierResponceResult) {
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
    this.allDataTableService.getSupplierTable('KAM-ABM-1649801111106').subscribe(
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

  supplierNameFocusout(supplierNamevalue) {
    console.log(this.supplierLookUpName)
     let studentObj = this.supplierLookUpName.filter(t=>t.name === supplierNamevalue.name);
    console.log(studentObj)

    console.log(supplierNamevalue)
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
    console.log(result);
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
