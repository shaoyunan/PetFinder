import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { Pet } from '../../model/pet.model';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import { PetSectionService } from './../../homepage/pet-section/pet-section.service';


@Injectable()
export class DetailPetService {
  private url:string = 'http://localhost:4000';


  constructor(private http: Http) { }

  //localhost:4000/pet/{petid}
  getPet = function(value:String):Observable<Pet> {//value should be pet id here
    return this.http.get(this.url+"/pet/"+value)
                    .map((res:Response)=>res.json());
  }
  
  getLocation= function(value):Observable<any> {//value should be pet id here
    console.log('service: ' + value)
    return this.http.get(this.url+"/pet/"+value+"/ownerlocation")
                    .map((res:Response)=>res.json());
  }

  // http://localhost/pet/{petid}/owner
  getOwnerId = function(value:String):Observable<any> {//value should be pet id here
      console.log('detail-pet service: petid - ' + value);
      return this.http.get(this.url+"/pet/"+ value + '/owner')
                      .map((res:Response)=>res.json());
    }
}
