import { Injectable } from '@angular/core';
import { Message } from '../../model/message.model';
import {Observable} from "rxjs/Observable";
import { Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactCardService {
  private url: string = 'http://localhost:4000';
  postObj: any

  constructor(private http: Http) { }

      postMessage = function(message: Message): Observable<any>{
        //console.log('service: messagecontent - ' + message.messagecontent + ', userto - ' + message.userto);
        this.postObj = {'messagecontent' : message.messagecontent, 'receiverid': message.userto};
        return this.http.post(this.url + '/user/' + localStorage.getItem('userid') + '/message', this.postObj)
            .map((res:Response)=>res.json());
      }
}
