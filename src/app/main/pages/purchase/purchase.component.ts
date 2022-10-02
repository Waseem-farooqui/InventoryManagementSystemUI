import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddingItemUserService} from "../../../services/addingItemUser.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {GetAllDataService} from "../../../services/getAllData.Service";
import {Hotkey, HotkeysService} from "angular2-hotkeys";
import {Table} from "primeng/table";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  active: any;
  result: any;
  itemCategoryResponce: any;
  jobList: any = [];
  profileClassifications = [];
  profileClassificationsResult: any = [];
  quantityItem: any = [];
  purchasePrice: any = [];
  discountPrcnt: any = [];
  retailPriceTable: any = [];
  sum: any;
  barcode: any = [];
  @ViewChild('dataTableShortListCandidate') table: Table;
  today = new Date();
  jstoday = '';

  constructor(private formBuilder: FormBuilder, private addingService: AddingItemUserService, private toastr: ToastrService,
              private router: Router, private spinner: NgxSpinnerService, private allDataTableService: GetAllDataService,
              private hotkeysService: HotkeysService) {
  }

  ngOnInit(): void {
    this.active = [
      {name: true},
      {name: false},
    ]
    this.registerForm = this.formBuilder.group({
      invoice: [null],
      purchaseDate: [null],
      goDown: [null],
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
    this.getAllServices();
  }

  quanitityFocusOut(value, i) {
    console.log(i)
    this.quantityItem[i] = value.value;
    console.log(this.quantityItem[i]);
    let obj = this.getTotalSumOfColumn(this.quantityItem);
    console.log(obj)
  }

  purchaseFocusOut(value, i) {
    this.purchasePrice[i] = value.value;
    console.log(this.purchasePrice[i]);
    console.log(this.getTotalSumOfColumn(this.purchasePrice));
  }

  getTotalSumOfColumn(column) {
    return column.reduce((accumulator, obj) => {
      return accumulator + obj;
    }, 0);

  }

  discountPercentage(value, i) {
    this.discountPrcnt[i] = value.value;
    console.log(value.value)
    console.log(i)
  }

  retailPriceFocusOut(value, i) {
    this.retailPriceTable[i] = value.value;
    console.log(this.retailPriceTable[i])
  }

  sum2() {
    this.sum = this.quantityItem + this.purchasePrice;
    console.log(this.sum)
  }

  onKey(event: any, index) {
    if (event.key === "Enter" && this.barcode[index] === undefined) {
      this.barcode[index] = event.target.value;
      console.log(this.barcode)
    }

  }
  addDatalist(value , index){
    const control1 = this.registerForm.get('purchaseArray')['controls'][index].get('aliasNameTable');
    console.log(control1)
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
    this.addingService.getCityName('job_classification').subscribe(
      res => {
        this.result = res;
        console.log(res);
        if (this.result && this.result.lookupDto && this.result.lookupDto.length > 0) {
          this.result = this.result.lookupDto;
          for (const val of this.result) {
            this.profileClassifications.push(val.value);

          }
        } else {
          this.profileClassifications = [];
        }


      },
      err => {


      }
    );
  }

  searchClassifications(event): void {
    this.profileClassificationsResult = this.profileClassifications.filter(c => c.toLowerCase().startsWith(event.query.toLowerCase()));
  }

  /*--------------Get Supplier All Data list------------------*/
  getJobList(bool) {
    this.allDataTableService.getSupplierTable('KAM-ABM-1649801111106').subscribe(
      res => {
        this.jobList = res;
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
    const control = this.registerForm.controls.purchaseArray as FormArray;
    control.push(this.purchaseArray(null, null, null,
      null, null, 1, null, null, null, null, null, null, null, null));
  }

  removesPurchaseRow(i) {
    const control = this.registerForm.controls.purchaseArray as FormArray;
    control.removeAt(i);
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
      name: value.itemName,
      numericalFactor: value.numericalFactor,
      expiry: value.expiryDayLimit,

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
