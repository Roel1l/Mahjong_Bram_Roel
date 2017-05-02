import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestOptions, RequestOptionsArgs, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';  //import to we can use the toPromise() operator
import { Game } from '../models/game';
import { GameTemplate } from '../models/game-template';

@Injectable()
export class TemplateService {

  private baseUrl = 'http://mahjongmayhem.herokuapp.com';  // URL to web api
  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  //GETS
  getTemplates(): Promise<GameTemplate[]> {
    var url = this.baseUrl + "/gametemplates";
    return this.http.get(url)
      .toPromise()
      //Promises' then callback
      //use responses json.data method to extract json from the response
      .then(function (response) {
        return response.json() as GameTemplate[];
      })
      //Catch errors and passrt hem to an errorhandler 
      .catch(this.handleError);
  }

}
