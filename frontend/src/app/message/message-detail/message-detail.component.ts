import { Component, OnInit } from '@angular/core';
import { Message } from '../../model/message.model';
import { MessageDetailService } from './message-detail.service';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss'],
  providers: [MessageDetailService]
})
export class MessageDetailComponent implements OnInit {

  msg: Message

  constructor(private messageDetailService: MessageDetailService) { }

  ngOnInit() {
    this.msg = JSON.parse(localStorage.getItem('msg'));
  }

}
