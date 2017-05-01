import { Injectable }    from '@angular/core';
import { Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';  //import to we can use the toPromise() operator
import { Game } from '../models/game';

@Injectable()
export class GameService {

  private baseUrl = 'http://mahjongmayhem.herokuapp.com';  // URL to web api
  constructor(private http: Http) { }

/*
Returns an  RxJS Observable (is converted to a promise with)
*/
  getGames(playerId: string): Promise<Game[]> {
    var url = this.baseUrl + "/games";
    //var reqBody = {name: playerId}
    return this.http.get(url,JSON.stringify({player: playerId}))
               .toPromise()
               //Promises' then callback
               //use responses json.data method to extract json from the response
               .then(function(response){
                   return  response.json() as Game[];
               })
               //Catch errors and passrt hem to an errorhandler 
               .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

// //GET hero by id
// getHero(id: number): Promise<Hero> {
//   const url = `${this.heroesUrl}/${id}`;
//   return this.http.get(url)
//     .toPromise()
//     .then(response => response.json().data as Hero)
//     .catch(this.handleError);
// }

// //PUT update hero by id
// private headers = new Headers({'Content-Type': 'application/json'});
// update(hero: Hero): Promise<Hero> {
//   const url = `${this.heroesUrl}/${hero.id}`;
//   return this.http
//     .put(url, JSON.stringify(hero), {headers: this.headers})
//     .toPromise()
//     .then(() => hero)
//     .catch(this.handleError);
// }

// //POST create new hero
// create(name: string): Promise<Hero> {
//   return this.http
//     .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
//     .toPromise()
//     .then(res => res.json().data as Hero)
//     .catch(this.handleError);
// }

// //DELETE hero 
// delete(id: number): Promise<void> {
//   const url = `${this.heroesUrl}/${id}`;
//   return this.http.delete(url, {headers: this.headers})
//     .toPromise()
//     .then(() => null)
//     .catch(this.handleError);
// }





}
