import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestOptions, RequestOptionsArgs, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';  //import to we can use the toPromise() operator
import { Game } from '../models/game';
import { User } from '../models/user';

@Injectable()
export class GameService {

  private baseUrl = 'http://mahjongmayhem.herokuapp.com';  // URL to web api
  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  /*
  Returns an  RxJS Observable (is converted to a promise with)
  */

  //GETS
  getGamesByUser(playerId: string): Promise<Game[]> {
    var url = this.baseUrl + "/games/?player=" + playerId;
    return this.http.get(url)
      .toPromise()
      //Promises' then callback
      //use responses json.data method to extract json from the response
      .then(function (response) {
        return response.json() as Game[];
      })
      //Catch errors and passrt hem to an errorhandler 
      .catch(this.handleError);
  }

  getGames(): Promise<Game[]> {
    var url = this.baseUrl + "/games";
    return this.http.get(url)
      .toPromise()
      //Promises' then callback
      //use responses json.data method to extract json from the response
      .then(function (response) {
        return response.json() as Game[];
      })
      //Catch errors and passrt hem to an errorhandler 
      .catch(this.handleError);
  }

  getGame(gameId: string): Promise<Game> {
    var url = this.baseUrl + "/games/" + gameId;
    return this.http.get(url)
      .toPromise()
      //Promises' then callback
      //use responses json.data method to extract json from the response
      .then(function (response) {
        return response.json() as Game;
      })
      //Catch errors and passrt hem to an errorhandler 
      .catch(this.handleError);
  }

  //POSTS
  joinGame(gameId: string, user: User): void {
    var basicOptions: RequestOptionsArgs = {
      url: this.baseUrl + "/games/" + gameId + "/players",
      method: RequestMethod.Post,
      search: null,
      headers: new Headers(
        {
          //'Content-Type': 'application/json',
          'x-username': user._id,
          'x-token': user.token
        }
      ),
      body: null
    };

    var reqOptions = new RequestOptions(basicOptions);
    var req = new Request(reqOptions);

    this.http.request(req).toPromise().then(function (response) {
      console.log(response);
    }).catch(
      function (error) {
        console.log(error);
      }
      );
  }
    /*
    Used to generate Headers object with username and token
    More stuff can be appended by using the return value of this method.append()
    */
    getAuthHeaders(user: User): Headers{
      var headers = new Headers();
      headers.append('x-username',user._id);
      headers.append('x-token',user.token);
      return headers;
    }

    create(user: User, game: Game): Promise<Game> {
    var url = this.baseUrl + "/games";
console.log(user,game.gameTemplate);
     var basicOptions: RequestOptionsArgs = {
      url: this.baseUrl + "/games",
      method: RequestMethod.Post,
      search: null,
      headers: new Headers(
        {
          //'Content-Type': 'application/json',
          'x-username': user._id,
          'x-token': user.token
        }
      ),
      body:
        {
          templateName: game.gameTemplate._id,
          minPlayers: game.minPlayers,
          maxPlayers: game.maxPlayers
        }
    };

    var reqOptions = new RequestOptions(basicOptions);
    var req = new Request(reqOptions);

    return this.http.request(req).toPromise().then(function (response) {
      console.log("success");
      return response.json() as Game;
    }).catch(
      function (error) {
        console.log(error);
      }
    );
  }

  //DELETES
  leaveGame(gameId: string, user: User): void {
    var basicOptions: RequestOptionsArgs = {
      url: this.baseUrl + "/games/" + gameId + "/players",
      method: RequestMethod.Delete,
      search: null,
      headers: new Headers(
        {
          //'Content-Type': 'application/json',
          'x-username': user._id,
          'x-token': user.token
        }
      ),
      body: null
    };

    var reqOptions = new RequestOptions(basicOptions);
    var req = new Request(reqOptions);

    this.http.request(req).toPromise().then(function (response) {
      console.log(response);
    }).catch(
      function (error) {
        console.log(error);
      });
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

  //TODO: implement POST create new game


  // //DELETE hero 
  // delete(id: number): Promise<void> {
  //   const url = `${this.heroesUrl}/${id}`;
  //   return this.http.delete(url, {headers: this.headers})
  //     .toPromise()
  //     .then(() => null)
  //     .catch(this.handleError);
  // }





}
