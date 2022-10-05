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

  }

  patchAlias() {
    const name = this.supplierForm.controls.name.value
    this.supplierForm.patchValue({
      aliesName: (name.substring(0, 1) + name.substring(name.length, name.length - 1)).toUpperCase(),
    });
  }

  get supplierFormControl() {
    return this.supplierForm.controls;
  }

  trimInputField(val) {
    const registerEmail = this.supplierForm.controls.email.value.trimEnd(val).trimStart(val);
    this.supplierForm.controls.email.patchValue(registerEmail);
  }


  /*--------------Submit advance search form------------------*/
  onSubmit() {
    this.spinner.show('main-spinner');
    this.submitted = true;
    const supplierForm = this.supplierForm.value;
    if (this.supplierForm.invalid) {
      this.toastr.error('Please Fill the Mendotory Fields');
      return;
    }

    this.spinner.show('main-spinner');
    this.addingService.addNewSupplier(supplierForm).subscribe(
      res => {
        this.spinner.hide('main-spinner');
        this.newSuppliersCreationResponce = res;
        if (this.newSuppliersCreationResponce.statusCode === 201 || this.newSuppliersCreationResponce.statusCode === 200){
          this.toastr.success(this.newSuppliersCreationResponce.message);
          window.location.reload();
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
