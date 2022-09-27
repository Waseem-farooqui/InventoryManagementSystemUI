import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordStrengthValidator} from "../password-strength.validator";
import {CustomValidators} from "../custom-validators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor( private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
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
  }

}
