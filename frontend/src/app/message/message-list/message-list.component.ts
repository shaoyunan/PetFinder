import { Component, OnInit } from '@angular/core';
import { Message } from '../../model/message.model';
import { MessageListService } from './message-list.service';
import { MessageDetailService } from '../message-detail/message-detail.service';
import {Modal} from 'ngx-modal';
import { NgModel, NgForm } from '@angular/forms';
import { catchError } from 'rxjs/operators/catchError';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  providers: [MessageListService, MessageDetailService]
})
export class MessageListComponent implements OnInit {

  userid: string = localStorage.getItem('userid');
  sentMsgList: Message[]
  receivedMsgList: Message[]

  modal:  Modal;
  modalError = false;
  msg: Message;
  replyObj: any;

  constructor(private messageListService: MessageListService, private messageDetailService: MessageDetailService) {
  }

  ngOnInit() {
    this.refreshSentMsgList();
    this.refreshReceivedMsgList();
  }

  refreshSentMsgList(){
      this.messageListService.getSentMsgList()
                .subscribe(
                        (sentMsgList) => {
                            this.sentMsgList = sentMsgList;
                        },
                        (error) => console.log(error)
                      );
   }

   refreshReceivedMsgList(){
         this.messageListService.getReceivedMsgList()
                         .subscribe(
                                 (receivedMsgList) => {
                                     this.receivedMsgList = receivedMsgList;
                                 },
                                 (error) => console.log(error)
                               );
      }

   setMessage(msg: Message) {
      localStorage.setItem('msg', JSON.stringify(msg));
    }

    viewMessage = (msg: Message,modal: Modal) => {
        this.msg = msg;
        this.msg.userto = this.msg.userto;
        this.msg.userfrom = localStorage.getItem('userid');
        this.modal = modal;
        this.modal.open();
      }


   onSubmit = (model: Modal,form: NgForm) => {
          //console.log('reply: userfrom - ' + this.msg.userto);
          this.replyObj = {'messagecontent': form.controls['reply'].value, 'receiverid': this.msg.userto};
          this.messageListService.postMessage(this.replyObj)
                .subscribe((res) => {
                  if(res.status){
                    alert('Reply successfully!');
                  } else {
                    alert('Reply fail!');
                  }
                  this.modal.close();
                  form.reset();
                  this.refreshSentMsgList();
                  this.refreshReceivedMsgList();
                },
                (err) => {
                  console.log(err);
                 }
                );
   }
}
