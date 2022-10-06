import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable()
export class ConfigApiService {
  baseUrl: any;

  constructor() {
    this.baseUrl = environment.apiURL;
  }
  lookUPForPOS(lookupType) {
    return this.baseUrl + 'lookup?type=' + lookupType;
  }

  getSupplierTableData(id) {
    return this.baseUrl + 'profile-service/profile/short-list?jobId=' + id;
  }

  addItemCategory() {
    return this.baseUrl + 'items/categories'
  }

  addNewItem() {
    return this.baseUrl + 'items'
  }

  addPurchase() {
    return this.baseUrl + 'purchases'
  }

  addNewSupplier() {
    return this.baseUrl + 'suppliers'
  }


  // get All Tables Value
  getItemCategoryTable() {
    return this.baseUrl + 'items/categories'
  }

  getItemTable() {
    return this.baseUrl + 'items'
  }
  getPurchaseTable(){
    return this.baseUrl + 'purchases'
  }
  getSupplierTable(){
    return this.baseUrl + 'suppliers'
  }

}
