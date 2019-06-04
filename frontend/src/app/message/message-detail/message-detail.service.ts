import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { Message } from '../../model/message.model';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MessageDetailService {

  msg: Message

  constructor(private http: Http) { }




}
