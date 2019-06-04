import { Component, OnInit } from '@angular/core';
import { Pet } from '../../model/pet.model';
import {BrowsePetsService} from "./browse-pets.service";
import { DataServiceService } from '../../data-service.service';
import {findUp} from "@angular/cli/utilities/find-up";

@Component({
  selector: 'app-browse-pets',
  templateUrl: './browse-pets.component.html',
  styleUrls: ['./browse-pets.component.scss'],
  providers: [BrowsePetsService, DataServiceService]
})
export class BrowsePetsComponent implements OnInit {

  petList: Pet[];
  searchURL: string = 'default searchURL';
  searchMap: Map<string, string> = new Map<string, string>();
  searchKeyWord: string = '';
  showKeyWord: boolean = false;

  constructor(private browsePetService: BrowsePetsService, private data: DataServiceService) {
    this.searchMap.set('type', 'Any');
    this.searchMap.set('primarybreed', 'Any');
    this.searchMap.set('age', 'Any');
    this.searchMap.set('gender', 'Any');
    this.searchMap.set('location', 'Any');
    this.searchMap.set('sort', 'Any');
  }

  ngOnInit() {
    this.searchURL = localStorage.getItem('searchURL');
    console.log('browse pets: searchURL - ' + this.searchURL);
    this.refreshPetList(this.searchURL);
  }

  refreshPetList = (searchURL: string) => {
    this.browsePetService.getPets(searchURL)
      .subscribe(
        (petList) => {
          this.petList = petList;
        },
        (error) => console.log(error)
      );
  }

  searchByKeyword() {
      this.searchURL = 'http://localhost:4000/pets/searchbykeyword?keyword=' + this.searchKeyWord;
      this.browsePetService.getPets(this.searchURL)
                .subscribe(
                  (petList) => {
                    this.petList = petList;
                  },
                  (error) => console.log(error)
                );
    }
  changeSearch(value: string){
    let k = value.split(':')[0];
    let v = value.split(':')[1];
    this.searchMap.set(k, v);
    this.generateSearchURL();
    this.browsePetService.getPets(this.searchURL)
          .subscribe(
            (petList) => {
              this.petList = petList;
            },
            (error) => console.log(error)
          );
  }

  generateSearchURL(){
    this.searchURL = 'http://localhost:4000/pets/search';
    let count = 0;
    this.searchMap.forEach((value: string, key: string) => {
      if(value != 'Any'){
        if(count == 0){
          this.searchURL += '?';
          count++;
        } else {
          this.searchURL += '&';
        }
        this.searchURL += key + '=' + value;
      }
    });
  }

  showKeyWordToggle() {
    this.showKeyWord = !this.showKeyWord;
  }
  setPetId(pet: Pet) {
    localStorage.setItem('petid', pet._id);
     }

}
