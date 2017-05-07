import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, Request, RequestOptions, RequestOptionsArgs, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';  //import to we can use the toPromise() operator
import { Game } from '../models/game';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserDependendComponent } from "app/core/UserDependend.base";
@Injectable()
export class GameService extends UserDependendComponent {


  /*
    UTILITY
  */
  private baseUrl = 'http://mahjongmayhem.herokuapp.com';  // URL to web api
  constructor(
    private http: Http,
    userService: UserService
  ) {
    super(userService);
    super.ngOnInit();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  /*
    Used to generate Headers object with username and token
    More stuff can be appended by using the return value of this method.append()
    */
  getAuthHeaders(): Headers {
    var headers = new Headers();
    headers.append('x-username', this.user._id);
    headers.append('x-token', this.user.token);
    return headers;
  }

  /*
    GETS
  */
  getGamesByUser(): Promise<Game[]> {
    var url = this.baseUrl + "/games/?player=" + this.user._id;
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

  /*
  POSTS
  */
  startGame(gameId: string): Promise<void> {
    var basicOptions: RequestOptionsArgs = {
      url: this.baseUrl + "/games/" + gameId + "/start",
      method: RequestMethod.Post,
      search: null,
      headers: new Headers(
        {
          //'Content-Type': 'application/json',
          'x-username': this.user._id,
          'x-token': this.user.token
        }
      ),
      body: null
    };

    var reqOptions = new RequestOptions(basicOptions);
    var req = new Request(reqOptions);
    
    return this.http.request(req).toPromise().then(function (response) {
      console.log(response);
      console.log('game started');
    }).catch(
      function (error) {
        console.log(error);
      });
  }

   joinGame(gameId: string): Promise<void> {
    var basicOptions: RequestOptionsArgs = {
      url: this.baseUrl + "/games/" + gameId + "/players",
      method: RequestMethod.Post,
      search: null,
      headers: new Headers(
        {
          //'Content-Type': 'application/json',
          'x-username': this.user._id,
          'x-token': this.user.token
        }
      ),
      body: null
    };

    var reqOptions = new RequestOptions(basicOptions);
    var req = new Request(reqOptions);

    return this.http.request(req).toPromise().then(function (response) {
    }).catch(
      function (error) {
        console.log(error);
      }
      );
  }

  createGame(game: Game): Promise<Game> {
    var url = this.baseUrl + "/games";

    var basicOptions: RequestOptionsArgs = {
      url: this.baseUrl + "/games",
      method: RequestMethod.Post,
      search: null,
      headers: new Headers(
        {
          //'Content-Type': 'application/json',
          'x-username': this.user._id,
          'x-token': this.user.token
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
      return response.json() as Game;
    }).catch(
      function (error) {
        console.log(error);
      }
      );
  }

  /*
  DELETES
  */
  leaveGame(gameId: string): Promise<void> {
    var basicOptions: RequestOptionsArgs = {
      url: this.baseUrl + "/games/" + gameId + "/players",
      method: RequestMethod.Delete,
      search: null,
      headers: new Headers(
        {
          //'Content-Type': 'application/json',
          'x-username': this.user._id,
          'x-token': this.user.token
        }
      ),
      body: null
    };

    var reqOptions = new RequestOptions(basicOptions);
    var req = new Request(reqOptions);

    return this.http.request(req).toPromise().then(function (response) {
      console.log(response);
    }).catch(
      function (error) {
        console.log(error);
      });
  }

  

  deleteGame(gameId: string): Promise<void> {

    var basicOptions: RequestOptionsArgs = {
      url: this.baseUrl + "/games/" + gameId,
      method: RequestMethod.Delete,
      search: null,
      headers: new Headers(
        {
          //'Content-Type': 'application/json',
          'x-username': this.user._id,
          'x-token': this.user.token
        }
      ),
      body: null
    };

    var reqOptions = new RequestOptions(basicOptions);
    var req = new Request(reqOptions);

    return this.http.request(req).toPromise().then(function (response) {
      console.log(response);
    }).catch(
      function (error) {
        console.log(error);
      });
  }






}
