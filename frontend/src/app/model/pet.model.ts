export class Pet {
  _id: string;
  name: string;
  type: string;
  primarybreed: string;
  age: string;
  sex: string;
  description: string;
  imagelink: string[];
  postTime: string;
  image:string;
  constructor (name: string, 
              type: string, 
              primarybreed: string,
              age: string,
              sex: string,
              description: string,
              image:string
            ) {}
}

