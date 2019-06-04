import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';

import { User } from '../../model/user.model';
import { Contact } from '../../model/contact.model';
import { Router } from '@angular/router';
import { AdopterProfileService } from './adopter-profile.service';
import { Bookmark } from '../../model/bookmark.model';
import { BookmarkListService } from './../../bookmark/bookmark-list/bookmark-list.service';

@Component({
  selector: 'app-adopter-profile',
  templateUrl: './adopter-profile.component.html',
  styleUrls: ['./adopter-profile.component.scss'],
})
export class AdopterProfileComponent implements OnInit {
  user: User = {} as any;
  contact: Contact = {} as any;
  public href: string = "http://localhost:4200/#";
  bookmark: Bookmark = {} as any;
  msg: string= '';
  msg1: string='';
  msg2: string='';

  constructor(private adopterProfileService: AdopterProfileService,
    private bookmarkListService: BookmarkListService,
    private router: Router) {
    this.user._id = localStorage.getItem('userid');
    //console.log('component: userid - ' + this.user._id );

  }

  ngOnInit() {
    this.refreshUser(this.user._id);
    this.bookmark.tag = "profile";
    this.bookmark.url = this.href + this.router.url;
  }

  refreshUser = (value: String) => {//input value should be User id
    this.adopterProfileService.getUserProfile(value)
      .subscribe(
        (contact) => {
          this.contact = contact;
        }
      );
  }
  editUser = (value: Contact) => {
    console.log(value);
    this.contact = new Contact(value.firstname,
      value.lastname,
      value.phone,
      value.address1,
      value.address2,
      value.state,
      value.city,
      value.zip);
  }

  onSubmit(adopterForm: NgForm){
    if(this.contact.firstname==='' || this.contact.lastname===''){
      this.msg='Name Field Empty!';
    }else if(!this.validatePhone(this.contact.phone.toString())){
      this.msg1='Invalid Phone Number';
    }else if(this.contact.address1===''){
      this.msg2='Address1 Is Required';
    }
    else{
      this.doSubmit(adopterForm);
    }
  }


  doSubmit = (adopterForm: NgForm) => {
    //console.log(myForm.value);
    this.adopterProfileService.editUserProfile(adopterForm.value)
      .subscribe((res) => {
        this.resetMsg();
        this.refreshUser(this.user._id);
        alert('Profile Updated');
        console.log(res);
        //adopterForm.reset();
      },
        (err) => {
          console.log(err);
        }
      );
  }

  setBookmark = () => {

    this.bookmarkListService.addBookmark(this.bookmark)
      .subscribe((res) => {
        alert('Book Updated');
        console.log(res);
      },
        (err) => {
          console.log(err);
        }
      );

  }

  validatePhone(number) {
    var re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return re.test(String(number));
  }

  resetMsg(){
    this.msg='';
    this.msg1='';
    this.msg2='';
  }
}
