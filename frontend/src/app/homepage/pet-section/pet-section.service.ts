import { Injectable } from '@angular/core';
import { Pet } from '../../model/pet.model';
import { Observable} from 'rxjs/Observable';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PetSectionService {
  private url:string = 'http://localhost:4000';
  constructor(private http:Http) { }
  petId:string;
  public getPetsByLoc = function(value:String/*input location here*/): Observable<Pet[]/*return type pet here*/> {
    return this.http.get(this.url+"/pets/"+value/*location*/)
              .map((res:Response)=>res.json());
  }

  //localhost:4000/pets/random
  getRandPets = function(): Observable<Pet[]> {
    return this.http.get(this.url+"/pets/random")
              .map((res:Response)=>res.json());
  }
}
