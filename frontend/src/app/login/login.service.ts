import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import {Observable} from "rxjs/Observable";
import { Http,Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  private url: string = 'http://localhost:4000';

    constructor(private http: Http) { }

      loginUser = function(user: User): Observable<any>{
        return this.http.post(this.url + '/user/login/', user)
            .map((res:Response)=>res.json());
      }

}
