import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable()
export class ConfigApiService {
  baseUrl: any;

  constructor() {
    this.baseUrl = environment.apiURL;
  }
  lookUPForPOS(lookupType) {
    return  'http://api.kamayi.com.pk/api/' + 'business/lookup?type=' + lookupType;
  }
  getSupplierTableData(id){
    return this.baseUrl + 'profile-service/profile/short-list?jobId=' + id;
  }
  addItemCategory(){
    return this.baseUrl + 'items/categories'
 }
  addNewItem(){
    return this.baseUrl + 'items'
 }
 addNewSupplier(){
    return this.baseUrl + 'suppliers'
 }

}
