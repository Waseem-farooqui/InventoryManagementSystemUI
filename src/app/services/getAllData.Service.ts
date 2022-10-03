import {Injectable} from "@angular/core";
import {ConfigApiService} from "./configApi.service";
import {HttpClient} from "@angular/common/http";



@Injectable()
export class GetAllDataService {
  constructor(private configApiService: ConfigApiService, private httpClient: HttpClient) {
  }

  // getItemCategoryTable(){
  //     return this.httpClient.get('../../assets/tableJson.json');
  // }
  getItemCategoryTable(){
    return this.httpClient.get(this.configApiService.getItemCategoryTable())
  }
  getItemTable(){
    return this.httpClient.get(this.configApiService.getItemTable())
  }
  getPurchaseTable(){
    return this.httpClient.get(this.configApiService.getPurchaseTable())
  }
  getSupplierTable(){
    return this.httpClient.get(this.configApiService.getSupplierTable())
  }

}
