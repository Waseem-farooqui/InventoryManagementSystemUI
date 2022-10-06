import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddingItemUserService} from "../../../../services/addingItemUser.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {GetAllDataService} from "../../../../services/getAllData.Service";
import {Hotkey, HotkeysService} from "angular2-hotkeys";
import {autoCompleteServices} from "../../../../services/autoCompleteServices";
import {Table} from "primeng/table";

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.css']
})
export class NewPurchaseComponent implements OnInit {
  purchaseForm: FormGroup;
  submitted = false;
  active: any;
  supplierResponseResult: any;
  itemResponseResult: any;
  supplierLookUpName = [];
  supplierLookUpNameResult: any = [];
  itemLookUpName: any = [];
  itemLookUpNameResult: any = [];
  aliasLookUpName: any = [];
  aliasLookUpNameResult: any = [];
  itemQuantityArray: number[] = [];
  stockArray: number[] = [];
  purchasePrice: number[] = [];
  selectItemName: any = [];
  updateSupplierData: any = [];
  barcode: string[] = [];
  netTotalArray: number[] = [];
  purchaseFormNameArray: string[] = [];
  purchaseFormAliasArray: string[] = [];
  purchaseFormPurchasePriceArray: number[] = [];
  ides: string;
  isAddMode: boolean;
  @ViewChild('dataTableShortListCandidate') table: Table;
  today = Date.now();
  purchaseTableName: string = 'purchaseTable'
  private supplierId: number;
  private purchaseResponse: any;

  constructor(private formBuilder: FormBuilder, private addingService: AddingItemUserService,
              private toastr: ToastrService,
              private router: Router, private spinner: NgxSpinnerService,
              private allDataTableService: GetAllDataService,
              private hotkeysService: HotkeysService, private autoComlete: autoCompleteServices) {
    autoComlete.listOfAliasName = [];
  }

  ngOnInit(): void {
    this.ides = '';
    this.isAddMode = !this.ides;
    this.active = [
      {name: "true"},
      {name: "false"}
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
      printBill: [null],
      orderCode: [null],
      purchaseTable: this.formBuilder.array([this.purchaseTable(null, null, null,
        0, new Date(), 1, null, null, null, 0, null, 0, null, 0)]),
      inventoryStock: [null],
      totalDiscountPercentage: [0],
      flatDisc: [0],
      miscValue: [0],
      inventoryGst: [0],
      totalStock: [null],
      purchaseExpense: [0],
      lastPurchasePrice: [null],
      avgPrice: [null],
      grandTotal: [null],

    });
    this.getAllServices();
    if (!this.isAddMode){
      this.getPurcase()
    }

  }

  getPurcase() {
    // this.route.queryParams.subscribe(params => {
    //   this.updatePurcase = params;
    // });

    this.spinner.show('main-spinner');
    this.allDataTableService.getPurchaseTable().subscribe(
      responseJobSeekerUpdate => {
        this.spinner.hide('main-spinner');
        this.updateSupplierData = responseJobSeekerUpdate;
        this.updateSupplierData = this.updateSupplierData.purchases[0];
        console.log(this.updateSupplierData);
        if (this.updateSupplierData.aliasName !== null || this.updateSupplierData.avgPrice !== null ||
          this.updateSupplierData.flatDisc !== null || this.updateSupplierData.goDown !== null ||
          this.updateSupplierData.grandTotal !== null  ||
          this.updateSupplierData.inventoryGst !== null || this.updateSupplierData.lastPurchasePrice !== null ||
          this.updateSupplierData.miscValue !== null || this.updateSupplierData.printBill !== null ||
          this.updateSupplierData.purchaseDate !== null || this.updateSupplierData.purchaseExpense !== null ||
          this.updateSupplierData.purchased !== null || this.updateSupplierData.supplierInvoiceNumber !== null ||
          this.updateSupplierData.totalDiscountPercentage !== null ||
          this.updateSupplierData.totalStock !== null || this.updateSupplierData.id !== null
          || this.updateSupplierData.purchaseTable !== null || this.updateSupplierData.purchaseTable !== undefined ) {
          this.purchaseForm.patchValue({
            aliasName:this.updateSupplierData.aliasName,
            avgPrice:this.updateSupplierData.avgPrice,
            flatDisc:this.updateSupplierData.flatDisc,
            goDown:this.updateSupplierData.goDown,
            grandTotal:this.updateSupplierData.grandTotal,
            inventoryGst:this.updateSupplierData.inventoryGst,
            lastPurchasePrice:this.updateSupplierData.lastPurchasePrice,
            miscValue:this.updateSupplierData.miscValue,
            printBill:this.updateSupplierData.printBill,
            purchaseDate:this.updateSupplierData.purchaseDate,
            purchaseExpense:this.updateSupplierData.purchaseExpense,
            purchased:this.updateSupplierData.purchased,
            supplierInvoiceNumber:this.updateSupplierData.supplierInvoiceNumber,
            totalDiscountPercentage:this.updateSupplierData.totalDiscountPercentage,
            totalStock:this.updateSupplierData.totalStock,
            id:this.updateSupplierData.id,
            purchaseTable:this.updateSupplierData.purchaseTables,


          })
        }
      }
    )
    console.log('update')
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
    return this.purchaseForm.get(this.purchaseTableName)['controls'][tableIndex].controls
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
        this.purchaseFormNameArray[tableIndex] = tableControl.name.patchValue(this.selectItemName.name)
      else
        this.purchaseFormAliasArray[tableIndex] = tableControl.aliasNameTable.patchValue(this.selectItemName.alias)

      this.purchaseFormPurchasePriceArray[tableIndex] = tableControl.purchasePrice.patchValue(this.selectItemName.purchasePrice)
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
    this.itemQuantityArray[tableIndex] = tableControl.quantity.value;
    tableControl.netPrice.patchValue(tableControl.purchasePrice.value * tableControl.quantity.value - tableControl.discountPrice.value);
    tableControl.discountPrice.patchValue((tableControl.netPrice.value / 100) * tableControl.discountPercentage.value)
    tableControl.discountPercentage.patchValue(tableControl.discountPrice.value / tableControl.netPrice.value * 100)
    tableControl.totalExcludingDiscount.patchValue(tableControl.netPrice.value - tableControl.discountPrice.value)
    tableControl.marginPercentage.patchValue(parseFloat(String((tableControl.retailPrice.value - tableControl.purchasePrice.value) / tableControl.purchasePrice.value * 100)).toFixed(2))
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
    purchaseFormControl.grandTotal.patchValue((netTotal - parseInt(purchaseFormControl.flatDisc.value)) + purchaseFormControl.miscValue.value + purchaseFormControl.purchaseExpense.value);
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
        this.toastr.error(err);
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
        this.toastr.error(err);
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


  purchaseTable(aliasNameTable, name, packing, batch, expiryDate, quantity, bonus, purchasePrice,
                totalExcludingDiscount, discountPercentage, discountPrice,
                retailPrice, netPrice, marginPercentage): FormGroup {
    return this.formBuilder.group({
      aliasNameTable: [aliasNameTable],
      name: [name],
      packing: [packing],
      batch: [batch],
      expiryDate: [expiryDate],
      quantity: [quantity],
      bonus: [bonus],
      purchasePrice: [purchasePrice],
      totalExcludingDiscount: [totalExcludingDiscount],
      discountPercentage: [discountPercentage],
      discountPrice: [discountPrice],
      retailPrice: [retailPrice],
      netPrice: [netPrice],
      marginPercentage: [marginPercentage],
    });
  }

  addPurchaseRow() {
    const purchaseRowcontrol = this.purchaseForm.controls.purchaseTable as FormArray;
    purchaseRowcontrol.push(this.purchaseTable(null, null, null,
      null, null, 1, null, null, null,
      null, null, null, null, null));
  }

  removesPurchaseRow(removePurchaseIndex) {
    const removePurchaseRowcontrol = this.purchaseForm.controls.purchaseTable as FormArray;
    removePurchaseRowcontrol.removeAt(removePurchaseIndex);
  }

  supplierNameOnSelect(supplierNamevalue) {
    const supplierObj = this.supplierResponseResult.find(supplier => supplier.name === supplierNamevalue.value);
    this.patchSupplierAlias(supplierNamevalue.value)
    this.supplierId = supplierObj.id;
  }



  onSubmit() {
    this.spinner.show('main-spinner');
    this.submitted = true;

    if (this.purchaseForm.invalid) {
      this.toastr.error('Please Fill the Mandatory Fields', 'Field Required', {
        positionClass: 'toast-center-bottom'
      });
      return;
    }
    const purchaseFormSubmissionObject = this.purchaseForm.value
    delete purchaseFormSubmissionObject.supplierName;
    purchaseFormSubmissionObject.supplierId = this.supplierId
    purchaseFormSubmissionObject.printBill = Boolean(JSON.parse(purchaseFormSubmissionObject.printBill.name))
    // if (!this.isAddMode){
    //   this.addingService.addPurchase(purchaseFormSubmissionObject ).subscribe(
    //     res => {
    //       this.spinner.hide('main-spinner');
    //       this.purchaseResponse = res;
    //       if (this.purchaseResponse.statusCode === 201 || this.purchaseResponse.statusCode === 200) {
    //         this.toastr.success(this.purchaseResponse.message);
    //       } else if (this.purchaseResponse.statusCode === 208) {
    //         this.toastr.warning(this.purchaseResponse.message);
    //       } else {
    //         this.toastr.error(this.purchaseResponse.message);
    //       }
    //     },
    //     error => {
    //       this.spinner.hide('main-spinner');
    //       if (error.error.message) {
    //         this.toastr.error(error.error.message);
    //       } else {
    //         this.toastr.error('Some problem occurred. Please try again.');
    //       }
    //     });
    // }
    this.addingService.addPurchase(purchaseFormSubmissionObject).subscribe(
      res => {
        this.spinner.hide('main-spinner');
        this.purchaseResponse = res;
        if (this.purchaseResponse.statusCode === 201 || this.purchaseResponse.statusCode === 200) {
          this.toastr.success(this.purchaseResponse.message);
        } else if (this.purchaseResponse.statusCode === 208) {
          this.toastr.warning(this.purchaseResponse.message);
        } else {
          this.toastr.error(this.purchaseResponse.message);
        }
      },
      error => {
        this.spinner.hide('main-spinner');
        if (error.error.message) {
          this.toastr.error(error.error.message);
        } else {
          this.toastr.error('Some problem occurred. Please try again.');
        }
      });
  }

}
