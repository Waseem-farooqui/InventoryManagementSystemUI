import {Injectable} from "@angular/core";
import {ConfigApiService} from "./configApi.service";
import {HttpClient} from "@angular/common/http";

@Injectable()

export class AddingItemUserService {
  constructor(private configApiService: ConfigApiService, private httpClient: HttpClient) {
  }

  getCityName(cityName) {
    console.log(cityName)
    return this.httpClient.get(this.configApiService.lookUPForPOS(cityName));
  }
}
