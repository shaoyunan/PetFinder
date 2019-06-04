import { Component, OnInit,Input } from '@angular/core';
import { Pet } from '../../model/pet.model';
import { User } from '../../model/user.model';
import { Observable } from 'rxjs/Observable';

import {Modal} from 'ngx-modal';
import { OwnerPetListService } from './owner-pet-list.service';
import { NgModel, NgForm } from '@angular/forms';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-owner-pet-list',
  templateUrl: './owner-pet-list.component.html',
  styleUrls: ['./owner-pet-list.component.scss']
})
export class OwnerPetListComponent implements OnInit {
  modal:  Modal;
  modalError = false;
  petList: Pet[];
  pet: Pet ={} as any;
  editpet: any;
  user: User ={} as any;
  petId:string;
  imageUrl: string = "./../../../assets/";
  @Input() url;
  public edited = false;

  constructor(private ownerPetListService:OwnerPetListService) {
    this.user._id = localStorage.getItem('userid');
  }

  ngOnInit() {
    this.refreshPets(this.user._id);
  }

  addPet = (modal: Modal) => {
    this.modal = modal;
    this.modal.open();
  }

  refreshPet = (value: String) => {//input value should be User id
    this.ownerPetListService.getPet(value)
      .subscribe(
      (pet) => {

        this.pet = pet;
        console.log(this.pet);
      }
      );
  }

  refreshPets = (value: String) => {//input value should be User id
    this.ownerPetListService.getPets(value)
      .subscribe(
      (petList) => {
        this.petList = petList;
      }
      );
  }

  onSubmit = (modal: Modal, addPetForm: NgForm) => {
    console.log(addPetForm.value);
    console.log(this.imageUrl);
    addPetForm.value.image=this.imageUrl;
     this.ownerPetListService.addPets(addPetForm.value)
       .subscribe((res) => {
         console.log(res);
         this.refreshPets(this.user._id);
         this.modal.close();
         addPetForm.reset();
         this.imageUrl= "./../../../assets/";
         this.edited=false;
       },
       (err) => {
         console.log(err);
         this.refreshPets(this.user._id);
        }
       );
   }

  editPet= (value: Pet,modal: Modal) => {
    this.refreshPet(value._id);

    console.log(value.image);
    this.pet=new Pet(value.name,
      value.type,
      value.primarybreed,
      value.age,
      value.sex,
      value.description,
      value.image);
    this.petId = value._id;
     console.log(this.pet);
    this.modal = modal;
    this.modal.open();
  }

  onEdit = () => {
    this.pet.image=this.imageUrl;
    console.log(this.pet.image);
    this.ownerPetListService.editPet(this.petId,this.pet)
//     catchError(
//       (error)=>{
//         console.log('testing');
//    // this.notifyService.popError();
//     return Observable.throw(error);
// }
//     )
    .subscribe((res) => {
      this.modal.close();
      this.refreshPets(this.user._id);
      this.edited=false;
    },
    (error)=>{
      console.log('Error')
     this.modalError = true;
      //this.modal.close();
    }
  );
    this.pet={} as any;
  }


  deletePet= (value: Pet,modal: Modal) => {
    console.log(value);
   this.petId = value._id;
    this.modal = modal;
    this.modal.open();
  }

  onDelete = () => {
    this.ownerPetListService.deletePet(this.petId)
      .subscribe((res) => {
        console.log(res);
        this.modal.close();
        this.refreshPets(this.user._id);
      });
  }

  /******************************Upload file********************************** */
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      // read file as data url
      reader.readAsDataURL(event.target.files[0]);
      this.imageUrl = this.imageUrl + event.target.files[0].name;
      console.log(this.imageUrl);

      // called once readAsDataURL is completed
      reader.onload = (event) => {
      this.url = reader.result;
      this.edited = true;
      }
    }
  }
  setPetIdOwner(pet: Pet) {
    localStorage.setItem('petid', pet._id);
   }
}
