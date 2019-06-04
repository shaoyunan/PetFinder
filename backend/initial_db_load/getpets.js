var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var fs = require('fs');
const owner = [1,2,3,4,5];

function Get(){
    var Httpreq = new XMLHttpRequest(); // a new request
    //Send the proper header information along with the request
    //Httpreq.setRequestHeader("Content-type", "application/json"); 
    Httpreq.onreadystatechange = function() {//Call a function when the state changes.
        if(this.readyState ==4 && this.status == 200) {
            // Request finished. Do processing here.
            console.log("response:"+this.responseText);
            var pet = parsePetResponse(this.responseText);
            if(pet!= null){
                console.log('pushed');
                writePetIntoJsonFile(pet);
            }
        }
    };
    Httpreq.open("GET","http://api.petfinder.com/pet.getRandom?format=json&key=e1987cadca128f29e1855ac35d0b1a94&output=full",false);
    Httpreq.send();        
} 


function parsePetResponse(responseText){
    var petInfo = JSON.parse(responseText);

    var valid_images=[];
    try {
        var images = petInfo.petfinder.pet.media.photos.photo;
    for(var i in images ){
       // console.log(images[i].$t);
        var n = images[i].$t.match(/(?<=\width=)([0-9]+)/g);
      //  console.log("num is: ",n);
        if (n>=300){
            valid_images.push(images[i].$t);
         //   console.log('pho recorded: ',images[i]);
        }else{
            console.log("pic less than 300",images[i].$t);
        }
    }
   
    var raw_contact= {
        phone: "",
        state: "",
        address1: "",
        address2:"",
        email:"",
        city: "",
        zip: "",
        fax: ""
    }
    try {
       raw_contact.phone =  petInfo.petfinder.pet.contact.phone.$t;
    } catch (error) {console.log("raw contact:"+error);}
    try {
        raw_contact.state =  petInfo.petfinder.pet.contact.state.$t;
     } catch (error) {console.log("raw contact:"+error);}
     try {
        raw_contact.address1 =  petInfo.petfinder.pet.contact.address1.$t;
     } catch (error) {console.log("raw contact:"+error);}
     try {
        raw_contact.address2 =  petInfo.petfinder.pet.contact.address2.$t;
     } catch (error) {console.log("raw contact:"+error);}
     try {
        raw_contact.email =  petInfo.petfinder.pet.contact.email.$t;
     } catch (error) {console.log("raw contact:"+error);}
     try {
        raw_contact.city =  petInfo.petfinder.pet.contact.city.$t;
     } catch (error) {console.log("raw contact:"+error);}
     try {
        raw_contact.zip =  petInfo.petfinder.pet.contact.zip.$t;
     } catch (error) {console.log("raw contact:"+error);}
     try {
        raw_contact.fax =  petInfo.petfinder.pet.contact.fax.$t;
     } catch (error) {console.log("raw contact:"+error);}

     for (var propertyName in raw_contact) {
        if (typeof raw_contact[propertyName] === 'string' ||
           raw_contact[propertyName] instanceof String){
           }else{
        raw_contact[propertyName] = "";
       }
     }
    var pet = {
        "ownerid":owner[Math.floor(Math.random() * owner.length)],
        "name":petInfo.petfinder.pet.name.$t,
        "type":petInfo.petfinder.pet.animal.$t,
        "primarybreed":petInfo.petfinder.pet.breeds.breed[0].$t,
        "sex":petInfo.petfinder.pet.sex.$t,
        "age":petInfo.petfinder.pet.age.$t,
        "description":petInfo.petfinder.pet.description.$t,
        "contact":{
            "phone":raw_contact.phone,
            "state":raw_contact.state,
            "address1":raw_contact.address1,
            "address2":raw_contact.address2,
            "email":raw_contact.email,
            "city":raw_contact.city,
            "zip":raw_contact.zip,
            "fax":raw_contact.fax
        },
        //petInfo.petfinder.pet.contact,
        "imagelink":valid_images
       };
       

    console.log("pet: "+pet);
    return pet;

} catch (error) {
    console.log(error);
    return null;
}
}


function writePetIntoJsonFile(pets){
    console.log(pets);
    var json = JSON.stringify(pets);
    console.log(json);
    fs.appendFile('petsjson.json', json+",", 'utf8', function(err){
        if(err) console.log('err happened: ',err);
      });
}

for (i = 0; i <= 300; i++) { 
Get();
}

