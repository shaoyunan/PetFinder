import { Component, OnInit } from '@angular/core';
import { BookmarkListService } from './bookmark-list.service';
import { FormControl } from '@angular/forms';
import { User } from '../../model/user.model';
import { Pet } from '../../model/pet.model';
import { Bookmark } from '../../model/bookmark.model';
import {Modal} from 'ngx-modal';
import { Location } from '@angular/common';
@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss']
})
export class BookmarkListComponent implements OnInit {
  user: User ={} as any;
  bookmark:Bookmark ={} as any;
  bookmarks: Bookmark [];
  modal:  Modal;
  modalError = false;
  bookmarkId:string;
  petList: Pet[] = [];

  constructor(private bookmarkListService:BookmarkListService) { }

  ngOnInit() {
    this.user._id = localStorage.getItem('userid');
    this.refreshBookmarks(this.user._id);
  }

  refreshBookmarks = (value: string) => {//input value should be User id
    this.bookmarkListService.getBookmarks(value)
      .subscribe(
      (bookmarks) => {
        this.bookmarks = bookmarks;
        this.refreshPetList();
      }
      );
  }

  refreshPetList() {
    for(let bookmark of this.bookmarks){
      if(bookmark.tag == 'view'){
        this.setPet(bookmark);
      }
    }
  }

  deleteBookmark = (value: Bookmark,modal: Modal) => {
    console.log(value._id);
    this.bookmarkId = value._id;
    console.log(this.bookmarkId);
    this.modal = modal;
    this.modal.open();
  }

  onDelete = () => {
    console.log(this.bookmarkId);
    this.bookmarkListService.deleteBookmark(this.bookmarkId)
      .subscribe((res) => {
        console.log(res);
        this.modal.close();
        this.refreshBookmarks(this.user._id);
      });
  }

  setPet(petBookmark: Bookmark){
    let petURL = petBookmark.url;
    let petid = petURL.split('/')[6];
    this.bookmarkListService.getPetByPetid(petid)
      .subscribe((pet) => {
              console.log('setPet: ' + pet.name);
              this.petList.push(pet);
            });
  }


  load() {
  location.reload();
  }
  
  checkTag(bookmark: Bookmark, value: string) {
    if(value == bookmark.tag){
      return true;
     }
     return false;
  }

}
