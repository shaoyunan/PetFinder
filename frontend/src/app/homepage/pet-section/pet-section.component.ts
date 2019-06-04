import { Component, OnInit } from '@angular/core';
import { Pet } from '../../model/pet.model';
import { Router } from '@angular/router';
import { PetSectionService } from './pet-section.service';

@Component({
  selector: 'app-pet-section',
  templateUrl: './pet-section.component.html',
  styleUrls: ['./pet-section.component.scss']
})
export class PetSectionComponent implements OnInit {

 
  private url:string = 'http://localhost:4000';
  petList: Pet[];
  
  constructor(private petSectionService:PetSectionService,
             ) {
              
  }

  ngOnInit() {
    this.refreshPets();
   
  }
  refreshPets = () => {
    this.petSectionService.getRandPets()
      .subscribe(
      (pets) => {
        this.petList = pets;
      }
      );
  }
  setPetId(pet: Pet) {
    localStorage.setItem('petid', pet._id);
     }

  
}
