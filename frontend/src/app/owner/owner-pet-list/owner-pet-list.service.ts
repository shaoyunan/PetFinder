import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { Pet } from '../../model/pet.model';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';

@Injectable()
export class OwnerPetListService {
  private url:string ='http://localhost:4000'
  petList: Pet[];
  petId:string;
  
  userid:string = localStorage.getItem('userid');

  constructor(private http: Http,) { }

  //localhost:4000/pet/{petid}
  getPet = function(value:String):Observable<Pet> {//value should be pet id here
    return this.http.get(this.url+"/pet/"+value)
                    .map((res:Response)=>res.json());
  }
  //localhost/user/{userId}/pet
  getPets = function(value:String):Observable<Pet[]> {//value should be user id here
    return this.http.get(this.url+"/user/"+value+"/pet")
                    .map((res:Response)=>res.json());
  }
  addPets = function(value:Pet):Observable<Response> {
    console.log(this.userid);
    return this.http.post(this.url+"/user/"+this.userid+"/pet",value);
  }

  //localhost/user/{userId}/pet/{petid}
  editPet= function(petid:string, value:Pet): Observable<Response> {
    return this.http.put(this.url+"/user/"+this.userid+"/pet/"+petid,value);
  }

  //localhost/user/{userId}/pet/{petid}
  deletePet = function(value:string): Observable<Response> {
    return this.http.delete(this.url+"/user/"+this.userid+"/pet/"+value);
  }

  setPetId(petid: string) {
    this.petId= petid;
   }

  getPetId(){    
  return this.petId;
  }
   

}
