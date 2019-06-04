import { Component, OnInit } from '@angular/core';
import { Message } from '../../model/message.model';
import { ContactCardService } from './contact-card.service';
import { DetailPetService } from '../../search/detail-pet/detail-pet.service';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
  providers: [ContactCardService, DetailPetService]
})
export class ContactCardComponent implements OnInit {
  message: Message;
  ownerid: string;
  prop: String = '';

  constructor(private contactCardService: ContactCardService, private detailPetService: DetailPetService) { }

  ngOnInit() {
    // get ownerid
    this.detailPetService.getOwnerId(localStorage.getItem('petid'))
      .subscribe(
        (response) => {
          this.ownerid = response._id;
        },
        (error) => console.log(error)
      );
  }

  onSubmit(contact) {
    this.message = new Message(contact.controls['msg'].value, this.ownerid, localStorage.getItem('userid'));
    if (this.message.messagecontent=='') {
      this.prop = 'Please fill the message.';
    } else {
      this.doSubmit(contact);
    }
  }

  doSubmit(contact) {
    this.contactCardService.postMessage(this.message)
      .subscribe(
        (response) => {
          console.log('contact-card component: ' + response.status);
          alert('Message sent successfully!');
          contact.reset();
          this.prop='';
        },
        (error) => console.log(error)
      );
  }

}
