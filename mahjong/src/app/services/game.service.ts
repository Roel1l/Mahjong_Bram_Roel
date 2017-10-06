import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, Request, RequestOptions, RequestOptionsArgs, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';  //import to we can use the toPromise() operator
import { Game } from '../models/game';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';
import { UserDependendComponent } from "app/core/UserDependend.base";
@Injectable()
export class GameService extends UserDependendComponent {

  private baseUrl = 'https://mahjongmayhem.herokuapp.com';  // URL to web api
  constructor(
    private http: Http,
    userService: UserService,
    private toastService: ToastService
  ) {
    super(userService);
    super.ngOnInit();
  }

  handleError(error: any, ts: GameService): void {
    //ts.toastService.showError("An error occurred, Check browser logs for more info.");
    console.error('An error occurred', error); // for demo purposes only
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
    var self = this;
    var url = this.baseUrl + "/games/?player=" + this.user._id;
    return this.http.get(url)
      .toPromise()
      //Promises' then callback
      //use responses json.data method to extract json from the response
      .then(function (response) {
        return response.json() as Game[];
      }).catch(error => self.handleError(error, self));

  }

  getGames(): Promise<Game[]> {
    var self = this;
    var url = this.baseUrl + "/games";
    return this.http.get(url)
      .toPromise()
      //Promises' then callback
      //use responses json.data method to extract json from the response
      .then(function (response) {
        return response.json() as Game[];
      }).catch(error => self.handleError(error, self));

  }

  getGame(gameId: string): Promise<Game> {
    var self = this;
    var url = this.baseUrl + "/games/" + gameId;
    return this.http.get(url)
      .toPromise()
      //Promises' then callback
      //use responses json.data method to extract json from the response
      .then(function (response) {
        return response.json() as Game;
      }).catch(error => self.handleError(error, self));

  }

  /*
  POSTS
  */
  startGame(gameId: string): Promise<void> {
    var self = this;
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
    });//.catch(error => self.handleError(error, self));

  }

  joinGame(gameId: string): Promise<void> {
    var self = this;
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
    self.toastService.showSuccess("Game joined");
    return this.http.request(req).toPromise().then(function (response) {
    }).catch(error => self.handleError(error, self));

  }

  createGame(game: Game): Promise<Game> {
    var self = this;
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
      self.toastService.showSuccess("Game created.");
      return response.json() as Game;
    }).catch(error => self.handleError(error, self));

  }

  /*
  DELETES
  */
  leaveGame(gameId: string): Promise<void> {
    var self = this;
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
    self.toastService.showSuccess("game left");
    return this.http.request(req).toPromise().then(function (response) {
    }).catch(error => self.handleError(error, self));

  }


}
