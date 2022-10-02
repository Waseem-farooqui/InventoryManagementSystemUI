import {Injectable} from "@angular/core";
import {ConfigApiService} from "./configApi.service";
import {HttpClient} from "@angular/common/http";

@Injectable()

export class AddingItemUserService {
  constructor(private configApiService: ConfigApiService, private httpClient: HttpClient) {
  }

  getLookupName(cityName) {
    console.log(cityName)
    return this.httpClient.get(this.configApiService.lookUPForPOS(cityName));
  }
  addItemCategory(body){
    return this.httpClient.post(this.configApiService.addItemCategory(), body)
  }
  addNewItem(body){
    return this.httpClient.post(this.configApiService.addNewItem(), body)
  }
  addNewSupplier(body){
    return this.httpClient.post(this.configApiService.addNewSupplier(), body)
  }
}
