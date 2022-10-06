import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AddingItemUserService} from "../../../../../services/addingItemUser.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {GetAllDataService} from "../../../../../services/getAllData.Service";
import {Table} from "primeng/table";

@Component({
  selector: 'app-itemtable',
  templateUrl: './itemtable.component.html',
  styleUrls: ['./itemtable.component.css']
})

export class ItemtableComponent implements OnInit {

  itemTableList: any = [];
  selectedCustomers: any[];
  @ViewChild('dataTableShortListCandidate') table: Table;

  constructor(private formBuilder: FormBuilder, private addingService: AddingItemUserService, private toastr: ToastrService,
              private router: Router, private spinner: NgxSpinnerService, private allDataTableService: GetAllDataService,) { }

  ngOnInit(): void {
    this.getJobList(true);
  }
  /*--------------Get Supplier All Data list------------------*/
  getJobList(bool) {
    this.allDataTableService.getItemTable().subscribe(
      itemTableResponse => {
        this.itemTableList = itemTableResponse;
        if (this.itemTableList.statusCode = 200){
          this.itemTableList = this.itemTableList.items;
        }

      },
      err => {
        // this.loading = false;
        this.spinner.hide('main-spinner');
        // this.toastr.error(err);

      }
    );
  }


}
