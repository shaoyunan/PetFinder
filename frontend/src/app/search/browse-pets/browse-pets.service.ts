import { Injectable } from '@angular/core';
import { Pet } from '../../model/pet.model';
import {Observable} from "rxjs/Observable";
import { Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BrowsePetsService {
  constructor(private http: Http) {
  }
  getPets = function(searchURL): Observable<Pet[]>{
    return this.http.get(searchURL)
      .map((res:Response)=>res.json());
  }

}
