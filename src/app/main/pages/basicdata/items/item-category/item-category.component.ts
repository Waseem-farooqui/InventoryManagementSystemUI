import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Table} from "primeng/table";
import {AddingItemUserService} from "../../../../../services/addingItemUser.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {GetAllDataService} from "../../../../../services/getAllData.Service";
import {ToastrService} from "ngx-toastr";
import {Hotkey, HotkeysService} from "angular2-hotkeys";

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.css']
})
export class ItemCategoryComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  active:any;
  result: any;
  itemCategoryResponce:any;
  jobList: any = [];
  selectedCustomers: any[];
  selectedCustomerss: any[];

  profileClassification: any;
  profileClassifications = [];
  profileClassificationsResult: any = [];
  @ViewChild('dataTableShortListCandidate') table: Table;
  constructor(private formBuilder: FormBuilder, private addingService: AddingItemUserService,  private toastr: ToastrService,
              private hotkeysService: HotkeysService,
              private router: Router, private spinner: NgxSpinnerService, private allDataTableService: GetAllDataService) { }


  ngOnInit(): void {
    this.formBuilderControlName();
    this.getAllServices();
    this.getJobList(true);
  }
  formBuilderControlName(){
    this.registerForm = this.formBuilder.group({
      code: [null],
      itemName: [null ,[Validators.required]],
      numericalFactor: [null],
      expiryDayLimit: [null ,[Validators.required]],
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
  hotclick(){
    this.hotkeysService.add(new Hotkey('shift+s' ,(event: KeyboardEvent): boolean => {
      this.onSubmit()
      return false;
    } ));
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
   this.registerForm.get('expiryDayLimit').reset();
   this.registerForm.get('expiryDayLimit').clearValidators();
   this.registerForm.get('expiryDayLimit').updateValueAndValidity();
  }



  /*--------------Submit advance search form------------------*/
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
    this.addingService.addItemCategory(result).subscribe(
      res => {
        this.spinner.hide('main-spinner');
        this.itemCategoryResponce = res;
        if (this.itemCategoryResponce.statusCode === 201 || this.itemCategoryResponce.statusCode === 200){
          this.toastr.success(this.itemCategoryResponce.message);
          this.getJobList(true)
        }else if (this.itemCategoryResponce.statusCode === 208){
          this.toastr.warning(this.itemCategoryResponce.message);
        }else {
          this.toastr.error(this.itemCategoryResponce.message);
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
