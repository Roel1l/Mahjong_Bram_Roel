import { Injectable }    from '@angular/core';
import { Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';  //import to we can use the toPromise() operator
import { User } from '../models/user';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class UserService {

  private baseUrl = 'http://mahjongmayhem.herokuapp.com';  // URL to web api


  private user: User = null;
  
  private user2: User = {
        _id: 'raa.guerand@student.avans.nl',
        name: 'Roel Guerand',
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InJhYS5ndWVyYW5kQHN0dWRlbnQuYXZhbnMubmwi.BG5tdMN3exflQILsKuPNryDDG024_GBNIM1w00gIpoA"
  };

  public User: BehaviorSubject<User>;

  constructor(private http: Http) { 
    this.User = new BehaviorSubject<User>(this.user2);
    //this.User.next(this.user);
    //this.User.lift
  }
/*
Returns an  RxJS Observable (is converted to a promise with)
*/

  getUser(): User {

    //Tijdelijk hardcoded user TODO echt inloggen via API en user returnen als promise
    
    return this.user;
  }


}
