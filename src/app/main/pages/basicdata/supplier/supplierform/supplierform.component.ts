import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddingItemUserService} from "../../../../../services/addingItemUser.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {GetAllDataService} from "../../../../../services/getAllData.Service";
import {Table} from "primeng/table";
import {ToastrService} from "ngx-toastr";
import {HotkeysService} from "angular2-hotkeys";


@Component({
  selector: 'app-supplierform',
  templateUrl: './supplierform.component.html',
  styleUrls: ['./supplierform.component.css']
})
export class SupplierformComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  active:any;
  newSuppliersCreationResponce: any;
  result: any;
  jobList: any = [];
  selectedCustomers: any[];
  selectedCustomerss: any[];

  profileClassification: any;
  profileClassifications = [];
  profileClassificationsResult: any = [];
  @ViewChild('dataTableShortListCandidate') table: Table;
  constructor(private formBuilder: FormBuilder, private addingService: AddingItemUserService, private toastr: ToastrService,
              private router: Router, private spinner: NgxSpinnerService, private allDataTableService: GetAllDataService,
              private hotkeys: HotkeysService) { }

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
      contactPerson: [''],
      statusActive: [''],
      defaultGst: [''],
      address1: [''],
      address2: [''],
      city: [''],
      manufactureCity: [''],
      postCode: [''],
      country: [''],
      phone1: [''],
      phone2: [''],
      mobile: ['' ,[Validators.required]],
      fax: [''],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9.!#$%&â€™*+/=?^_`{|}~-]+@[a-z0-9.-]+\\.[a-zA-Z0-9-]{2,4}$')]],
      email2: ['', [ Validators.email, Validators.pattern('^[a-zA-Z0-9.!#$%&â€™*+/=?^_`{|}~-]+@[a-z0-9.-]+\\.[a-zA-Z0-9-]{2,4}$')]],
      email3: ['', [ Validators.email, Validators.pattern('^[a-zA-Z0-9.!#$%&â€™*+/=?^_`{|}~-]+@[a-z0-9.-]+\\.[a-zA-Z0-9-]{2,4}$')]],
      supplierName: ['', [Validators.required, Validators.pattern('^^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$')]],
      aliesName: ['', [Validators.required, Validators.pattern('^^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$')]],
      website: [''],
      cnic: [''],
      bankAccount: [''],
      category: [''],
      wH: [''],
      ntn: [''],
      taxReg: [''],
      dayLimit: [''],
      introduction: [''],
    });
  }
  home(){
    console.log('das')
  }

  get supplierFormControl() {
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
      // code: value.code,
      name: value.contactPerson,
      contactNo: value.mobile,
      email: value.email,
      address: value.address1,
      alies: value.aliesName,
      status: value.statusActive.name,
      gst: value.defaultGst,
      city: value.city,
      country: value.country,
      cnic: value.cnic,
      category: value.category,
      bankAccount: value.bankAccount,
      ntnNumber: value.ntn,
      withHoldingPercentage: value.wH,
      taxRegistrationNumber: value.taxReg,

      address2: value.address2,
      manufactureCity: value.manufactureCity,
      postCode: value.postCode,
      phone1: value.phone1,
      phone2: value.phone2,
      mobile: value.mobile,
      fax: value.fax,
      email2: value.email2,
       email3: value.email3,
      supplierName: value.supplierName,
      website: value.website,
      dayLimit: value.dayLimit,
      introduction: value.introduction,
    };
    this.addingService.addNewSupplier(result).subscribe(
      res => {
        this.spinner.hide('main-spinner');
        this.newSuppliersCreationResponce = res;
        if (this.newSuppliersCreationResponce.statusCode === 201 || this.newSuppliersCreationResponce.statusCode === 200){
          this.toastr.success(this.newSuppliersCreationResponce.message);
          this.getJobList(true)
        }else if (this.newSuppliersCreationResponce.statusCode === 208){
          this.toastr.warning(this.newSuppliersCreationResponce.message);
        }else {
          this.toastr.error(this.newSuppliersCreationResponce.message);
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
