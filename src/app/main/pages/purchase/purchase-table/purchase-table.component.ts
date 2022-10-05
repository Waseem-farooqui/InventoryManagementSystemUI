import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {FormBuilder} from "@angular/forms";
import {AddingItemUserService} from "../../../../services/addingItemUser.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {GetAllDataService} from "../../../../services/getAllData.Service";

@Component({
  selector: 'app-purchase-table',
  templateUrl: './purchase-table.component.html',
  styleUrls: ['./purchase-table.component.css']
})
export class PurchaseTableComponent implements OnInit {
  selectedSupplier: any[];
  @ViewChild('dataTableShortListCandidate') table: Table;
  purchaseList: any = [];
  purchaseValueItem: any = [];
  constructor(private formBuilder: FormBuilder, private addingService: AddingItemUserService, private toastr: ToastrService,
              private router: Router, private spinner: NgxSpinnerService, private allDataTableService: GetAllDataService) { }

  ngOnInit(): void {
    this.getJobList(true)
  }
  /*--------------Get Supplier All Data list------------------*/

  /*--------------Get Supplier All Data list------------------*/
  getJobList(bool) {
    this.allDataTableService.getPurchaseTable().subscribe(
      tableResponce => {
        this.purchaseList = tableResponce;
        console.log(this.purchaseList);
        this.purchaseList = this.purchaseList.purchases;
        for (var val of this.purchaseList){
          console.log(val.items);
          this.purchaseValueItem = val.items;
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
