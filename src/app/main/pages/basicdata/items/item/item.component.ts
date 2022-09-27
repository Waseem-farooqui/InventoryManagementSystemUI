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
      name: [''],
      pieceOfPacking: [''],
      purchasePrice: [''],
      salesPrice: [''],
      allas: [''],
      manufacture: [''],
      packing: [''],
      printable: [''],
      category: [''],
      active: [''],
      class: [''],
      saleDisc: [''],
      location: [''],
      narcotics: [''],
      localSalesPrice: [''],
      localDicountPerc: [''],
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
      contactPerson: value.contactPerson,
      active: value.active,
      defaultGst: value.defaultGst,
      address1: value.address1,
      address2: value.address2,
      city: value.city,
      manufactureCity: value.manufactureCity,
      postCode: value.postCode,
      country: value.country,
      phone1: value.phone1,
      phone2: value.phone2,
      mobile: value.mobile,
      fax: value.fax,
      email: value.email,
      email2: value.email2,
      email3: value.email3,
      supplierName: value.supplierName,
      aliesName: value.aliesName,
      website: value.website,
      cnic: value.cnic,
      bankAccount: value.bankAccount,
      category: value.category,
      wH: value.wH,
      ntn: value.ntn,
      taxReg: value.taxReg,
      dayLimit: value.dayLimit,
      introduction: value.introduction,
    };
    console.log(result);
  }

}
