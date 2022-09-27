import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PasswordModule} from 'primeng/password';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  footerYear: number;
  submitted = false;
  hide = true;
  newUser = true;
  constructor(
    private formBuilder: FormBuilder,private router: Router,
    private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.footerYear = new Date().getFullYear();
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required]
    });

  }
  get loginFormControl() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.router.navigate(['dashboard']);
  }
  trimInputField(value) {
    console.log(value);
  }
  register() {
    this.router.navigate(['/register'], );
  }


}
