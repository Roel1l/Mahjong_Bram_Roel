import { Injectable }    from '@angular/core';
import { Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';  //import to we can use the toPromise() operator
import { User } from '../models/user';

@Injectable()
export class UserService {

  private baseUrl = 'http://mahjongmayhem.herokuapp.com';  // URL to web api
  constructor(private http: Http) { }

/*
Returns an  RxJS Observable (is converted to a promise with)
*/
  getUser(): User {
    
    //Tijdelijk hardcoded user TODO echt inloggen via API en user returnen als promise
    var user: User =
      {
        _id: 'raa.guerand@student.avans.nl',
        name: 'Roel Guerand',
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InJhYS5ndWVyYW5kQHN0dWRlbnQuYXZhbnMubmwi.BG5tdMN3exflQILsKuPNryDDG024_GBNIM1w00gIpoA"
      }
    
    return user;
  }


}
