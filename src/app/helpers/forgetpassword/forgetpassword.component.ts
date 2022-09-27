import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  forgotForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  hide = true;
  footerYear: number;
  respose: any;
  constructor(
    private formBuilder: FormBuilder, private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.footerYear = new Date().getFullYear();
    this.forgotForm = this.formBuilder.group({
      userEmail: ['', [Validators.required,
        Validators.email, Validators.pattern('^[a-zA-Z0-9.!#$%&â€™*+/=?^_`{|}~-]+@[a-z0-9.-]+\\.[a-zA-Z0-9-]{2,4}$')]],

    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
  get forgetFormControl() { return this.forgotForm.controls; }
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.forgotForm.invalid) {
      return;
    }

    // this.spinner.show('main-spinner');
    // this.adminPanelService.forgotPassword(this.forgotForm.value)
    //   .subscribe(
    //     res => {
    //       this.spinner.hide('main-spinner');
    //
    //       this.respose = res;
    //       if (this.respose.responseCode === 200) {
    //         this.alertService.success('Mail has been generated successfully', true);
    //         this.router.navigate(['login']);
    //       } else {
    //         this.toastr.error(this.respose.responseMessage);
    //
    //       }
    //     },
    //     error => {
    //       this.spinner.hide('main-spinner');
    //       this.toastr.error(error.error.responseMessage);
    //     });
  }

}
