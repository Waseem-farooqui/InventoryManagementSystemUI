import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddingItemUserService} from "../../../../../services/addingItemUser.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {GetAllDataService} from "../../../../../services/getAllData.Service";
import {Table} from "primeng/table";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-supplierform',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  supplierForm: FormGroup;
  submitted = false;
  active: any;
  newSuppliersCreationResponce: any;
  supplierList: any = [];
  selectedSupplier: any[];
  @ViewChild('dataTableShortListCandidate') table: Table;

  constructor(private formBuilder: FormBuilder, private addingService: AddingItemUserService, private toastr: ToastrService,
              private router: Router, private spinner: NgxSpinnerService, private allDataTableService: GetAllDataService) {
  }

  ngOnInit(): void {
    this.formBuilderControlName();
    this.active = [
      {name: 'true'},
      {name: 'false'},
    ]
  }
  formBuilderControlName(){
    this.supplierForm = this.formBuilder.group({
      code: [''],
      aliesName: [''],

      name: ['', [Validators.required,]],
      contactNo: ['', [Validators.required,]],
      email: ['adminmail@smartaid.shop'],
      cnic: [''],

      city: ['Chakwal'],
      country: ['Pakistan'],
      postCode: ['448800'],
      address: ['Talagang road chakwal'],

      bankAccount: ['1212121212'],
      ntnNumber: [''],
      taxRegistrationNumber: [''],

      withHoldingPercentage: [''],
      gst: [''],
      status: [''],
      category: ['']
    });
    this.getJobList(true)
  }
  home(){
    this.router.navigate(['/basicData']);
  }

  get supplierFormControl() {
    return this.supplierForm.controls;
  }

  trimInputField(val) {
    const registerFirstName = this.supplierForm.controls.supplierName.value.trimEnd(val).trimStart(val);
    this.supplierForm.controls.supplierName.patchValue(registerFirstName);
    const registerLastName = this.supplierForm.controls.aliesName.value.trimEnd(val).trimStart(val);
    this.supplierForm.controls.aliesName.patchValue(registerLastName);
    const registerEmail = this.supplierForm.controls.email.value.trimEnd(val).trimStart(val);
    this.supplierForm.controls.email.patchValue(registerEmail);
  }

  /*--------------Get Supplier All Data list------------------*/

  getJobList(bool) {
    this.allDataTableService.getSupplierTable().subscribe(
      tableResponce => {
        this.supplierList = tableResponce;
        this.supplierList = this.supplierList.profiles;
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
    const supplierForm = this.supplierForm.value;
    // stop here if form is invalid
    // if (this.supplierForm.invalid) {
    //   return;
    // }
    this.spinner.show('main-spinner');
    // const result = {
    //   // code: value.code,
    //   name: supplierForm.supplierName,
    //   contactNo: supplierForm.mobile,
    //   email: 'adminmail@smartaid.shop',
    //   address: supplierForm.address1,
    //   alies: supplierForm.aliesName,
    //   status: supplierForm.statusActive.name,
    //   gst: supplierForm.defaultGst,
    //   city: supplierForm.city,
    //   country: supplierForm.country,
    //   cnic: supplierForm.cnic,
    //   category: supplierForm.category,
    //   bankAccount: supplierForm.bankAccount,
    //   ntnNumber: supplierForm.ntn,
    //   withHoldingPercentage: supplierForm.wH,
    //   taxRegistrationNumber: supplierForm.taxReg,
    //
    //   address2: supplierForm.address2,
    //   manufactureCity: supplierForm.manufactureCity,
    //   postCode: supplierForm.postCode,
    //   phone1: supplierForm.phone1,
    //   phone2: supplierForm.phone2,
    //   mobile: supplierForm.mobile,
    //   fax: supplierForm.fax,
    //   email2: supplierForm.email2,
    //    email3: supplierForm.email3,
    //   supplierName: supplierForm.supplierName,
    //   website: supplierForm.website,
    //   dayLimit: supplierForm.dayLimit,
    //   introduction: supplierForm.introduction,
    // };
    this.addingService.addNewSupplier(supplierForm).subscribe(
      res => {
        this.spinner.hide('main-spinner');
        this.newSuppliersCreationResponce = res;
        if (this.newSuppliersCreationResponce.statusCode === 201 || this.newSuppliersCreationResponce.statusCode === 200){
          this.toastr.success(this.newSuppliersCreationResponce.message);
          this.ngOnInit()
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
