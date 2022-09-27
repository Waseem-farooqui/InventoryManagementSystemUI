import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-basicdata',
  templateUrl: './basicdata.component.html',
  styleUrls: ['./basicdata.component.css']
})
export class BasicdataComponent implements OnInit {

  constructor( private router: Router,) { }

  ngOnInit(): void {
  }
  suplier(){
    this.router.navigate(['supplierForm']);
  }


}
