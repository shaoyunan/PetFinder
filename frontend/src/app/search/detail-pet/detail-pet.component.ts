import { Component, OnInit, Input,ViewChild} from '@angular/core';
import { DetailPetService } from './detail-pet.service';
import { Pet } from '../../model/pet.model';
import { PetSectionService } from './../../homepage/pet-section/pet-section.service';
import { OwnerPetListService } from './../../owner/owner-pet-list/owner-pet-list.service';
import { Router,  Event as NavigationEvent, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { } from '@types/googlemaps';
import {Modal} from 'ngx-modal';
import { Bookmark } from '../../model/bookmark.model';
import { BookmarkListService } from './../../bookmark/bookmark-list/bookmark-list.service';

import { AgmMap } from '@agm/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';
@Component({
  selector: 'app-detail-pet',
  templateUrl: './detail-pet.component.html',
  styleUrls: ['./detail-pet.component.scss'],
})
export class DetailPetComponent implements OnInit {
  addEnabled: boolean = false;
  pet: Pet ={} as any;
  location:any;
  modal:  Modal;
  @ViewChild('map') myMap:AgmMap;
  lat: number ;
  lng: number ;
 // @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  public href: string = "http://localhost:4200/#";
  bookmark:Bookmark ={} as any;
  isLoggedIn: boolean = false;

  constructor(private detailPetService:DetailPetService,
              private petSectionService:PetSectionService,
              private ownerPetListService:OwnerPetListService,
              private router: Router,
              private bookmarkListService:BookmarkListService
             ){ 
               var routerUrl = this.router.url;
              //  console.log(routerUrl.substr(routerUrl.length-24));
               this.pet._id=routerUrl.substr(routerUrl.length-24);
              //  console.log(this.pet._id);
             
               if(localStorage.getItem('userid') !==''){
                this.isLoggedIn = true;
               }
              
              }

  ngOnInit() {
        this.refreshPet( this.pet._id); 
        console.log(this.router.url);
        this.bookmark.tag="view";
        this.bookmark.url=this.href+this.router.url    
  }
  
  toggleAdd = () => {
    this.addEnabled = !this.addEnabled;
  };

  refreshPet = (value: String) => {//input value should be pet id
    this.detailPetService.getPet(value)
      .subscribe(
      (pet) => {
        this.pet = pet;
      }
      );
    }
    LocatePet(modal:Modal) {
      console.log('inside component.ts');
      this.detailPetService.getLocation(localStorage.getItem('petid'))
      .subscribe(
      (location) => {
        //console.log("return result: "+JSON.stringify(location));
        this.location = location.location;
        this.lat = location.lat;
        this.lng = location.lng;
      }
      );
        console.log('coordinate: '+this.lat+' '+this.lng);
        this.modal = modal;
        this.modal.open();   
    };

    

  
  setBookmark = () => {
    
        this.bookmarkListService.addBookmark(this.bookmark)
          .subscribe((res) => {
            alert("Bookmark Updated");
            console.log(res);
          },
          (err) => {
            console.log(err);
                }
          );
    
      }
  
}
