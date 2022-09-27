import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Table} from "primeng/table";
import {AddingItemUserService} from "../../../../../services/addingItemUser.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {GetAllDataService} from "../../../../../services/getAllData.Service";

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

  profileClassification: any;
  profileClassifications = [];
  profileClassificationsResult: any = [];
  @ViewChild('dataTableShortListCandidate') table: Table;
  constructor(private formBuilder: FormBuilder, private addingService: AddingItemUserService,
              private router: Router, private spinner: NgxSpinnerService, private allDataTableService: GetAllDataService) { }

  ngOnInit(): void {
    this.formBuilderControlName();
    this.active =[
      {name: 'Yes'},
      {name: 'No'},
    ]
    this.getAllServices();
    this.getJobList(true);
  }
  formBuilderControlName(){
    this.registerForm = this.formBuilder.group({
      code: [''],
      itemName: [''],
      pieceOfPacking: [''],
      purchasePrice: [''],
      salesPrice: [''],
      active: [''],
      allasName: [''],
      manufacture: [''],
      packing: [''],
      printable: [''],
      category: [''],
      classDefault: [''],
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
    });
  }
  home(){
    console.log('das')
  }

  get itemsAddsFormControl() {
    return this.registerForm.controls;
  }
  searchClassifications(event): void {
    this.profileClassificationsResult = this.profileClassifications.filter(c => c.toLowerCase().startsWith(event.query.toLowerCase()));
  }

  // All Lookup service
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
    console.log('res')
    this.allDataTableService.getSupplierTable('KAM-ABM-1649801111106').subscribe(
      res => {
        console.log(res)
        this.jobList = res;
        this.jobList = this.jobList.profiles;
        console.log(this.jobList.profiles);


      },
      err => {
        // this.loading = false;
        this.spinner.hide('main-spinner');
        // this.toastr.error(err);

      }
    );
  }



  /*--------------Submit advance search form------------------*/
  onSubmit() {
    this.spinner.show('main-spinner');
    this.submitted = true;
    const value = this.registerForm.value;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.spinner.show('main-spinner');
    const result = {
      code: value.code,
      itemName: value.itemName,
      pieceOfPacking: value.pieceOfPacking,
      purchasePrice: value.purchasePrice,
      salesPrice: value.salesPrice,
      allasName: value.allasName,
      manufacture: value.manufacture,
      packing: value.packing,
      printable: value.printable,
      category: value.category,
      active: value.active,
      classDefault: value.class,
      saleDisc: value.saleDisc,
      location: value.location,
      narcotics: value.narcotics,
      lockSalesPrice: value.localSalesPrice,
      lockDicountPerc: value.localDicountPerc,
      salesDiscount2: value.salesDiscount2,
      salesDiscount3: value.salesDiscount3,
      salesDiscount4: value.salesDiscount4,
      reOrderQTY: value.reOrderQTY,
      optimumQTY: value.optimumQTY,
      saleDiscount: value.saleDiscount,
      minimumQty: value.minimumQty,
      avgPrice: value.avgPrice,
      itemAlert: value.itemAlert,
      allowDue:value.allowDue,
    };
    console.log(result);
  }

}
