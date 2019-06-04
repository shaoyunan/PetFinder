# Pet Adopter 
This application provides a web platform for pet lovers to seek and adopt pets, and for pet owners to help their pets find a new home. 
## How to run the application?
### Prerequisite
- Mongodb, Studio 3T(Optional)
- Node
- Angular cli
### Import database
Open Studio 3T and connect to your local mongodb server. Create a database called 'finalprojectDB' and import a collection with 'backend/api/config/users.json'.
### Start backend server
Go to the directory of backend folder, install node dependencies and start backend server.
```
cd final-project-v-love-we/backend/
npm i
npm start
```
### Start frontend server
Go to the directory of frontend folder, install node dependencies and start frontend server.
```
cd final-project-v-love-we/frontend/
npm i
ng serve
```
### Run application
Open your browser, and you can see the homepage on 'http://localhost:4200/#/homepage'.

## How to view Compodoc?
Run the following command, then compodoc shall reveal itself on 'http://localhost:8080'.
```
cd final-project-v-love-we/backend/
npm i
npm run doc:buildandserve
```
