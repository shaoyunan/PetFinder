import { Injectable } from '@angular/core';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import { User } from '../../model/user.model';
import { Contact } from '../../model/contact.model';

import { Observable } from 'rxjs';

@Injectable()
export class AdopterProfileService {
  private url:string ='http://localhost:4000'
  user: User ={} as any;
  contact:Contact ={} as any;

  userid:string = localStorage.getItem('userid');

  constructor(private http: Http) {

  }
      //localhost/user/profile/{ userId }
      getUserProfile = function(value:String):Observable<Contact> {//value should be user id here
      //console.log('service getUserProfile: userid - ' + this.userid );
        return this.http.get(this.url+"/user/profile/"+value)
                        .map((res:Response)=>res.json());
      }

      //localhost/user/profile/{ userId }
      editUserProfile = function(value:Contact): Observable<Response> {
      //console.log('service editUserProfile: userid - ' + this.userid );
        return this.http.put(this.url+"/user/profile/"+this.userid,value);
      }
}
