import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { Message } from '../../model/message.model';
import { Http,Response,Headers,RequestOptions} from '@angular/http';

@Injectable()
export class MessageListService {

private url:string = 'http://localhost:4000';

  constructor(private http: Http) { }

  // localhost/user/{userId}/messages/sent
  getSentMsgList = function():Observable<Message[]> {
    return this.http.get(this.url+"/user/"+localStorage.getItem('userid')+'/messages/sent')
                    .map((res:Response)=>res.json());
  }

  // localhost/user/{userId}/messages/received
    getReceivedMsgList = function():Observable<Message[]> {
      return this.http.get(this.url+"/user/"+localStorage.getItem('userid')+'/messages/received')
                      .map((res:Response)=>res.json());
    }

    postMessage = function(msg: any):Observable<any> {
          return this.http.post(this.url+"/user/"+localStorage.getItem('userid')+'/message', msg)
                          .map((res:Response)=>res.json());
        }

}
