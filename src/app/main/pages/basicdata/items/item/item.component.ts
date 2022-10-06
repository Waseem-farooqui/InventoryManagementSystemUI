import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  active: any;
  result: any;
  newItemsCreationResponce: any;
  profileClassifications = [];
  profileClassificationsResult: any = [];
  itemCategoryLookup = [];
  itemCategoryLookupResult: any = [];

  constructor(private formBuilder: FormBuilder, private addingService: AddingItemUserService, private toastr: ToastrService,
              private router: Router, private spinner: NgxSpinnerService, private allDataTableService: GetAllDataService,
              private hotkeys: HotkeysService) {
  }

  ngOnInit(): void {
    this.formBuilderControlName();
    this.active = [
      {name: true},
      {name: false},
    ]
    this.getAllServices();

  }
  formBuilderControlName(){
    this.registerForm = this.formBuilder.group({
      code: [''],
      name: ['', [Validators.required]],
      piecePerPackage: ['', [Validators.required]],
      sellingPrice: ['', [Validators.required]],
      purchasePrice: ['', [Validators.required]],
      active: [''],
      barCode: [''],
      manufacturer: [''],
      printable: [''],
      category: ['', [Validators.required]],
      classDefault: ['Default'],
      location: [''],
      narcotics: [''],
      lockSalePrice: [''],
      lockDiscPerc: [''],
      saleDiscount2: [''],
      saleDiscount3: [''],
      saleDiscount4: [''],
      reorderQuantity: ['3'],
      optimumQuantity: ['10'],
      saleDiscount: [''],
      quantity: ['0'],
      avgPrice: [''],
      alert: [''],
      allowDue: [''],
      description: [''],

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

  getIdFromCategoryName(name): number {
    return this.result.find(item => item.name === name).id
  }

  // All Lookup service
  getAllServices() {
    this.addingService.getLookupName('ITEM_CATEGORY').subscribe(
      res => {
        this.result = res;

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
        this.toastr.error(err)
      }
    );
  }

  // auto trim the input Name and email fields

  trimInputField(val) {
    const registerFirstName = this.registerForm.controls.name.value.trimEnd(val).trimStart(val);
    this.registerForm.controls.name.patchValue(registerFirstName);
    const registerLastName = this.registerForm.controls.barCode.value.trimEnd(val).trimStart(val);
    this.registerForm.controls.barCode.patchValue(registerLastName);
    const registerEmail = this.registerForm.controls.email.value.trimEnd(val).trimStart(val);
    this.registerForm.controls.email.patchValue(registerEmail);
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
    const itemSubmissionForm = this.registerForm.value;
    itemSubmissionForm.category = this.getIdFromCategoryName(itemSubmissionForm.category)
    console.log(JSON.stringify(itemSubmissionForm))
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.toastr.error('Please Fill the Mendotory Fields');
      return;
    }
    this.addingService.addNewItem(itemSubmissionForm).subscribe(
      res => {
        this.spinner.hide('main-spinner');
        this.newItemsCreationResponce = res;
        if (this.newItemsCreationResponce.statusCode === 201 || this.newItemsCreationResponce.statusCode === 200) {
          this.toastr.success(this.newItemsCreationResponce.message);
          window.location.reload()
        } else if (this.newItemsCreationResponce.statusCode === 208) {
          this.toastr.warning(this.newItemsCreationResponce.message);
        } else {
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
