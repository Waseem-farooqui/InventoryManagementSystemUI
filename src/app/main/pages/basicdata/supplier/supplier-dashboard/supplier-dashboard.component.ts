import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-supplier-dashboard',
  templateUrl: './supplier-dashboard.component.html',
  styleUrls: ['./supplier-dashboard.component.css']
})
export class SupplierDashboardComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }
  home(){
    this.router.navigate(['/basicData']);
  }


}
