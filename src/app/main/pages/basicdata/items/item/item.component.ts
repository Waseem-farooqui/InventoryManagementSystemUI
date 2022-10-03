import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Table} from "primeng/table";
import {AddingItemUserService} from "../../../../../services/addingItemUser.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {GetAllDataService} from "../../../../../services/getAllData.Service";
import {ToastrService} from "ngx-toastr";
import {HotkeysService} from "angular2-hotkeys";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  active:any;
  result: any;
  jobList: any = [];
  selectedCustomers: any[];
  selectedCustomerss: any[];
  newItemsCreationResponce:any;
  profileClassification: any;
  profileClassifications = [];
  profileClassificationsResult: any = [];
  itemCategoryLookup = [];
  itemCategoryLookupResult: any = [];
  @ViewChild('dataTableShortListCandidate') table: Table;
  constructor(private formBuilder: FormBuilder, private addingService: AddingItemUserService, private toastr: ToastrService,
              private router: Router, private spinner: NgxSpinnerService, private allDataTableService: GetAllDataService,
              private hotkeys: HotkeysService) { }

  ngOnInit(): void {
    this.formBuilderControlName();
    this.active =[
      {name: true},
      {name: false},
    ]
    this.getAllServices();
    this.getJobList(true);
  }
  formBuilderControlName(){
    this.registerForm = this.formBuilder.group({
      code: [''],
      itemName: ['' ,[Validators.required]],
      pieceOfPacking: ['',[Validators.required]],
      salesPrice: ['',[Validators.required] ],
      purchasePrice: [''],
      active: [''],
      allasName: ['',[Validators.required]],
      manufacture: [''],
      packing: [''],
      printable: [''],
      category: [''],
      classDefault: ['Default'],
      saleDisc: [''],
      location: [''],
      narcotics: [''],
      lockSalesPrice: [''],
      lockDicountPerc: [''],
      salesDiscount2: [''],
      salesDiscount3: [''],
      salesDiscount4: [''],
      reOrderQTY: [''],
      optimumQTY: [''],
      saleDiscount: [''],
      minimumQty: [''],
      avgPrice: [''],
      itemAlert: [''],
      allowDue:[''],
      description:[''],

    });
  }
  home(){
    this.router.navigate(['/basicData']);
  }

  get itemsAddsFormControl() {
    return this.registerForm.controls;
  }
  searchClassifications(event): void {
    this.profileClassificationsResult = this.profileClassifications.filter(c => c.toLowerCase().startsWith(event.query.toLowerCase()));
  }
  searchItemName(event): void {
    this.itemCategoryLookupResult = this.itemCategoryLookup.filter(c => c.toLowerCase().startsWith(event.query.toLowerCase()));
  }
  // All Lookup service
  getAllServices() {
    this.addingService.getLookupName('ITEM_CATEGORY').subscribe(
      res => {
        this.result = res;
        console.log(res);
        if (this.result && this.result.responseBody && this.result.responseBody.length > 0) {
          this.result = this.result.responseBody;
          for (const val of this.result) {
            this.itemCategoryLookup.push(val.name);

          }
        } else {
          this.itemCategoryLookup = [];
        }


      },
      err => {


      }
    );
  }

  // auto trim the input Name and email fields

  trimInputField(val) {
    const registerFirstName = this.registerForm.controls.supplierName.value.trimEnd(val).trimStart(val);
    this.registerForm.controls.supplierName.patchValue(registerFirstName);
    const registerLastName = this.registerForm.controls.aliesName.value.trimEnd(val).trimStart(val);
    this.registerForm.controls.aliesName.patchValue(registerLastName);
    const registerEmail = this.registerForm.controls.email.value.trimEnd(val).trimStart(val);
    this.registerForm.controls.email.patchValue(registerEmail);
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


 resetValidations(){
   this.registerForm.get('itemName').reset();
   this.registerForm.get('itemName').clearValidators();
   this.registerForm.get('itemName').updateValueAndValidity();
   this.registerForm.get('pieceOfPacking').reset();
   this.registerForm.get('pieceOfPacking').clearValidators();
   this.registerForm.get('pieceOfPacking').updateValueAndValidity();
   this.registerForm.get('salesPrice').reset();
   this.registerForm.get('salesPrice').clearValidators();
   this.registerForm.get('salesPrice').updateValueAndValidity();
   this.registerForm.get('allasName').reset();
   this.registerForm.get('allasName').clearValidators();
   this.registerForm.get('allasName').updateValueAndValidity();
 }


  /*--------------Submit form------------------*/
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

      // code: value.code,
      name: value.itemName,
      barCode: value.allasName,
      piecePerPackage: value.pieceOfPacking,
      description: value.description,
      sellingPrice: value.salesPrice,
      purchasePrice: value.purchasePrice,
      printable: true,
      saleDiscount: value.saleDiscount,
      location: value.location,
      narcotics: value.narcotics.name,
      lockSalePrice: value.lockSalesPrice.name,
      lockDiscPerc: value.lockDicountPerc.name,
      saleDiscount2: value.salesDiscount2,
      saleDiscount3: value.salesDiscount3,
      saleDiscount4: value.salesDiscount4,
      reorderQuantity: value.reOrderQTY,
      optimumQuantity: value.optimumQTY,
      alert: value.itemAlert.name,
      quantity: value.minimumQty,
      manufacturer: value.manufacture,
      // packing: value.packing,
      // category: value.category,
      // active: value.active.name,
      // classDefault: value.class,
      // saleDiscount: value.saleDisc,
      // avgPrice: value.avgPrice,
      // allowDue: value.allowDue,

    };
    this.addingService.addNewItem(result).subscribe(
      res => {
        this.spinner.hide('main-spinner');
        this.newItemsCreationResponce = res;
        if (this.newItemsCreationResponce.statusCode === 201 || this.newItemsCreationResponce.statusCode === 200){
          this.toastr.success(this.newItemsCreationResponce.message);
          this.getJobList(true)
          this.ngOnInit()
        }else if (this.newItemsCreationResponce.statusCode === 208){
          this.toastr.warning(this.newItemsCreationResponce.message);
        }else {
          this.toastr.error(this.newItemsCreationResponce.message);
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
