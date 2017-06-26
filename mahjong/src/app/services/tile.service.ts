import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, Request, RequestOptions, RequestOptionsArgs, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';  //import to we can use the toPromise() operator
import { Game } from '../models/game';
import { Tile } from '../models/tile';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';
import { UserDependendComponent } from "app/core/UserDependend.base";
@Injectable()
export class TileService extends UserDependendComponent {

  private baseUrl = 'http://mahjongmayhem.herokuapp.com';

  constructor
    (
    private http: Http,
    userService: UserService,
    public toastService: ToastService
    ) {
    super(userService);
    super.ngOnInit();
  }

  handleError(error: any,ts: TileService): void {
    ts.toastService.showError("An error occurred, Check browser logs for more info.");
    console.error('An error occurred', error); // for demo purposes only
  }


  getTilesByGame(gameId: string, matched: boolean): Promise<Tile[]> {
    var self = this;
    var url = this.baseUrl + "/games/" + gameId + "/tiles/?matched=" + matched;
    return this.http.get(url)
      .toPromise()
      .then(function (response) {
        return response.json() as Tile[];
    }).catch(error => self.handleError(error,self));
  }

  

  



   postMatch(gameId: string, tile1id: string, tile2id: string): Promise<void> {
    var self = this;
    var url = this.baseUrl + "/games/"+gameId+"/tiles/matches";
    var basicOptions: RequestOptionsArgs = {
      url: url,
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
        tile1Id: tile1id,
        tile2Id: tile2id
      }
    };

    var reqOptions = new RequestOptions(basicOptions);
    var req = new Request(reqOptions);

    return this.http.request(req).toPromise().then(function (response) {
      self.toastService.showSuccess("Tiles Matched.");
      return response.json();
    }).catch(error => self.handleError(error,self));
  }




}