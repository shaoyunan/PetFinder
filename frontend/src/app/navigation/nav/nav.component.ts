import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../../data-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [ DataServiceService]
})
export class NavComponent implements OnInit {
  isLoggedIn : boolean;
  email: string = localStorage.getItem('email');
  userid: string = localStorage.getItem('userid');
  homeurl: string = localStorage.getItem('homeurl');
  
  constructor(private router: Router, private data: DataServiceService) { }

  ngOnInit() {
      if(this.userid == ''){
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
  }

  routeToProfile() {
    console.log('this is routeToProfile');
    this.router.navigate([this.homeurl]);
  }

  logoutUser() {
    this.isLoggedIn = false;
    localStorage.setItem('userid', '');
    localStorage.setItem('role', '');
    localStorage.setItem('homeurl', '');
    localStorage.setItem('email', '');
    this.isLoggedIn = false;
    this.router.navigate(['/homepage']);
  }

  searchChange(value: string) {
    console.log('searchChange - value: ' + value)
    if(value == 'all') {
      localStorage.setItem('searchURL', "http://localhost:4000/pets/search");
    } else if (value == 'dog') {
       localStorage.setItem('searchURL', "http://localhost:4000/pets/search?type=Dog");
    } else if (value == 'cat') {
       localStorage.setItem('searchURL', "http://localhost:4000/pets/search?type=Cat");
    }

  }

}
