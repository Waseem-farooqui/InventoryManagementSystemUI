import {Injectable} from "@angular/core";
import {ConfigApiService} from "./configApi.service";
import {HttpClient} from "@angular/common/http";



@Injectable()
export class GetAllDataService {
  constructor(private configApiService: ConfigApiService, private httpClient: HttpClient) {
  }

  getSupplierTable(id){
      return this.httpClient.get('../../assets/tableJson.json');
  }

}
