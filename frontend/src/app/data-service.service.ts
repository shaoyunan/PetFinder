import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataServiceService {

  private searchURL = new BehaviorSubject<string>("http://localhost:4000/pets/search");
  currentSearchURL = this.searchURL.asObservable();

  constructor() { }

  changeSearchURL(searchURL: string){
    console.log('data service: before -' + searchURL);
    this.searchURL.next(searchURL);
  }

}
