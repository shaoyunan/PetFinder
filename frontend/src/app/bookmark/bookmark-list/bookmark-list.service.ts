import { Injectable } from '@angular/core';
import { Bookmark } from '../../model/bookmark.model';
import { Pet } from '../../model/pet.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class BookmarkListService {

  bookmark: Bookmark = {} as any;
  //userid: string = '';
  private url: string = 'http://localhost:4000';

  constructor(private http: Http) {
  }

  //localhost/user/{userId}/bookmarks
  getBookmarks = function (value: String): Observable<Bookmark[]> {//value should be user id here
    //alert(this.userid+localStorage.getItem('email')+localStorage.getItem('userid'));
    return this.http.get(this.url + "/user/" + localStorage.getItem('userid') + "/bookmarks")
      .map((res: Response) => res.json());
  }
  //localhost/user/{userId}/bookmark
  addBookmark = function (value: Bookmark): Observable<Response> {//value should be user id here
    return this.http.post(this.url + "/user/" + localStorage.getItem('userid') + "/bookmark", value);
  }

  //localhost/user/{userId}/bookmark/{bookmarkid}
  deleteBookmark = function (value: string): Observable<Response> {
    // console.log(value.url);
    return this.http.delete(this.url + "/user/" + localStorage.getItem('userid') + "/bookmark/" + value);
  }

  // localhost:4000/pet/{petid}
    getPetByPetid = function (value: string): Observable<Pet> {
      console.log('service - ' + this.url + '/pet/' + value);
      return this.http.get(this.url + '/pet/' + value)
        .map((res: Response) => res.json());
    }

}
