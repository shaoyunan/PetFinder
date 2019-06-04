import { Injectable } from '@angular/core';
import { User } from '../../model/user.model';
import {Observable} from "rxjs/Observable";
import { Http,Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RegisterService {
  private url: string = 'http://localhost:4000';
  registerObj : any

  constructor(private http: Http) { }

    registerUser = function(user: User, isowner: boolean): Observable<any>{
      this.registerObj = {'email': user.email, 'password': user.password, 'isowner': isowner};
      return this.http.post(this.url + '/user/register/', this.registerObj)
          .map((res:Response)=>res.json());
    }

}
