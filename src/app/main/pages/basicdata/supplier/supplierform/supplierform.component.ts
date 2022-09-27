import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-supplierform',
  templateUrl: './supplierform.component.html',
  styleUrls: ['./supplierform.component.css']
})
export class SupplierformComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  active:any;
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      code: [''],
      supplierName: [''],
      aliesName: [''],
      contactPerson: [''],
      active: [''],
      defaultGst: [''],
      address1: [''],
      address2: [''],
      city: [''],
      manufactureCity: [''],
      postCode: [''],
      landline1: [''],
      landline2: [''],
      mobile: [''],
      fax: [''],
      email: [''],
      email2: [''],
      email3: [''],
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
    this.active =[
      {name: 'Yes'},
      {name: 'No'},
    ]
  }
  home(){
    console.log('das')
  }
  get supplierFormControl() {
    return this.registerForm.controls;
  }
  onSubmit(){
    console.log('f')
  }

}
