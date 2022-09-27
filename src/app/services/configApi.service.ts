import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable()
export class ConfigApiService {
  baseUrl: any;

  constructor() {
    this.baseUrl = environment.apiURL;
  }
  lookUPForPOS(lookupType) {
    return this.baseUrl + 'business/lookup?type=' + lookupType;
  }
  getSupplierTableData(id){
    return this.baseUrl + 'profile-service/profile/short-list?jobId=' + id;
  }


}
