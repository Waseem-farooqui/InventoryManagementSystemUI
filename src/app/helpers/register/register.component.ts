import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordStrengthValidator} from "../password-strength.validator";
import {CustomValidators} from "../custom-validators";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  submitNext = false;
  hide = true;
  confirmhide = true;
  result: any;
  name: string;
  jobSeeker = true;
  gender: any;
  genders: any = [];
  city: any;
  cities:any;
  cityResult: any = [];
  owner: any;
  owneries = [];
  ownerResult: any = [];
  company: any;
  companies = [];
  industry: any;
  industries = [];
  industryResult: any = [];
  footerYear: number

  constructor( private formBuilder: FormBuilder,
               private router: Router, private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.footerYear = new Date().getFullYear();
    this.registerForm = this.formBuilder.group({
        contactPersonFirstName: ['', [Validators.required, Validators.pattern('^^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$')] ],
        contactPersonLastName: ['', [Validators.required, Validators.pattern('^^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$')]],
        companyName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9.!#$%&â€™*+/=?^_`{|}~-]+@[a-z0-9.-]+\\.[a-zA-Z0-9-]{2,4}$')]],
        industry: ['', Validators.required],
        // tslint:disable-next-line:max-line-length
        password: [
          null, [Validators.required, PasswordStrengthValidator, Validators.minLength(8)
          ]],
        confirmPassword: [null, Validators.compose([Validators.required])]

      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      });
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
    ];

  }

  get employerRegisterFormControl() {
    return this.registerForm.controls;
  }
  trimInputField(val) {
    const employerName = this.registerForm.controls.contactPersonFirstName.value.trimEnd(val).trimStart(val);
    this.registerForm.controls.contactPersonFirstName.patchValue(employerName);
    const registerEmail = this.registerForm.controls.email.value.trimEnd(val).trimStart(val);
    this.registerForm.controls.email.patchValue(registerEmail);
  }
  /*--------------Submit Employer Form------------------*/
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      // this.findInvalidControls();
      return;
    }
    const signUp = {
      email: this.registerForm.value.email,
      employeerDto: {
        city: this.registerForm.value.city,
        companyName: this.registerForm.value.companyName,
        contactEmail: this.registerForm.value.email,
        contactPersonName: this.registerForm.value.contactPersonFirstName,
        industry: this.registerForm.value.industry,
        jobDesignation: this.registerForm.value.jobDesignation,
        phoneNumber: this.registerForm.value.countryCode + '-' + this.registerForm.value.phone,

      },
      firstName: this.registerForm.value.contactPersonFirstName,
      lastName: this.registerForm.value.contactPersonLastName,
      password: this.registerForm.value.password,
      userName: this.registerForm.value.email
    };
    // this.spinner.show('main-spinner');
    // this.adminPanelService.emplyerSignUP(signUp).subscribe(
    //   res => {
    //     this.spinner.hide('main-spinner');
    //
    //     this.respose = res;
    //
    //     if (this.respose.responseCode === 201) {
    //
    //       this.toastr.success('The registration is successful. Please login with your credentials to access the portal');
    //       this.router.navigate(['/login']);
    //     } else {
    //       this.toastr.error(this.respose.responseMessage);
    //
    //     }
    //
    //   },
    //   error => {
    //     this.spinner.hide('main-spinner');
    //     if (error.error.responseMessage) {
    //       this.toastr.error(error.error.responseMessage);
    //     } else {
    //       this.toastr.error('Some problem occurred. Please try again.');
    //     }
    //   });
  }
  confirm() {

    this.router.navigate(['login']);
  }

}
