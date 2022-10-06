import {Injectable} from "@angular/core";
@Injectable()
export class autoCompleteServices {
  listOfAliasName: any =[]
  constructor() {
  }
  addNewElement(str: String): boolean{
    if(this.checkDuplicate(str)) {
      this.listOfAliasName.push(str);
      return true;
    }else{
      return false;
    }
  }
  checkDuplicate(str: String) : boolean{


   const indexOfAliasNAme =  this.listOfAliasName.indexOf(str);
   if(indexOfAliasNAme>-1){
     return false;
   }else{
     return true;
   }
  }
}
