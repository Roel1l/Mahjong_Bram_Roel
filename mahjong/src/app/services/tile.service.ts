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
    private toastService: ToastService
    ) {
    super(userService);
    super.ngOnInit();
  }

  private handleError(error: any): void {
    this.toastService.showError("An error occurred, Check browser logs for more info.");
    console.error('An error occurred', error); // for demo purposes only
  }


  getTilesByGame(gameId: string, matched: boolean): Promise<Tile[]> {
    var url = this.baseUrl + "/games/" + gameId + "/tiles/?matched=" + matched;
    return this.http.get(url)
      .toPromise()
      .then(function (response) {
        return response.json() as Tile[];
      })
      .catch(this.handleError);
  }


}