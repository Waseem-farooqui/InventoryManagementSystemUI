import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {FormBuilder} from "@angular/forms";
import {AddingItemUserService} from "../../../../../services/addingItemUser.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {GetAllDataService} from "../../../../../services/getAllData.Service";

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  selectedSupplier: any[];
  @ViewChild('dataTableShortListCandidate') table: Table;
  supplierList: any = [];
  constructor(private formBuilder: FormBuilder, private addingService: AddingItemUserService, private toastr: ToastrService,
              private router: Router, private spinner: NgxSpinnerService, private allDataTableService: GetAllDataService) { }

  ngOnInit(): void {
    this.getJobList(true)
  }
  /*--------------Get Supplier All Data list------------------*/

  getJobList(bool) {
    this.allDataTableService.getSupplierTable().subscribe(
      tableResponce => {
        console.log(tableResponce);
        this.supplierList = tableResponce;
        this.supplierList = this.supplierList.suppliers;
      },
      err => {
        // this.loading = false;
        this.spinner.hide('main-spinner');
        // this.toastr.error(err);

      }
    );
  }


}
