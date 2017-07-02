import { Injectable }    from '@angular/core';
import { Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';  //import to we can use the toPromise() operator
import { User } from '../models/user';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class UserService {

  private baseUrl = 'https://mahjongmayhem.herokuapp.com';  // URL to web api
  
  // private user: User = {
  //       _id: 'raa.guerand@student.avans.nl',
  //       name: 'Roel Guerand',
  //       token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InJhYS5ndWVyYW5kQHN0dWRlbnQuYXZhbnMubmwi.BG5tdMN3exflQILsKuPNryDDG024_GBNIM1w00gIpoA"
  // };

  public User: BehaviorSubject<User>;

  constructor(private http: Http) { 
    var user: User = JSON.parse(localStorage.getItem('user'));

    this.User = new BehaviorSubject<User>(user);
    //this.User.next(this.user);
    //do you even this.User.lift 
  }
}
