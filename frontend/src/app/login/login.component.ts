import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { LoginService } from './login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  user: User = new User();
  msg: string = '';
  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.checkLogin();
    this.refresh();
  }

  loginAsOwner() {
    if (this.user.email == '') {
      this.msg = 'Please enter your email address.'
    } else if (this.user.password == '') {
      this.msg = 'Please enter your password.'
    } else if (!this.validateEmail(this.user.email)) {
      this.msg = 'Invalid Email'
    } else {
      this.loginService.loginUser(this.user)
        .subscribe(
          (response) => {
            if (response.status && response.isowner && response.isowner) {
              /* set local storage */
              localStorage.setItem('userid', response._id);
              localStorage.setItem('email', response.email);
              localStorage.setItem('role', 'owner');
              localStorage.setItem('homeurl', '/user/owner-home');
              //alert(localStorage.getItem('userid'));
              this.router.navigate(['/user/owner-home']);
            } else if (response.status && !response.isowner) {
              this.refresh();
              this.msg = 'Account not exist for owner role. Please login as adopter or register as owner.';
              this.router.navigate(['/user/login']);
            } else {
              this.refresh();
              this.msg = response.msg;
              this.router.navigate(['/user/login']);
            }
          },
          (error) => console.log(error)
        );
    }
  }

  loginAsAdopter() {
    if (this.user.email == '') {
      this.msg = 'Please enter your email address.'
    } else if (this.user.password == '') {
      this.msg = 'Please enter your password.'
    } else if (!this.validateEmail(this.user.email)) {
      this.msg = 'Invalid Email'
    } else {
      this.loginService.loginUser(this.user)
        .subscribe(
          (response) => {
            if (response.status && !response.isowner) {
              /* set local storage */
              localStorage.setItem('userid', response._id);
              localStorage.setItem('email', response.email);
              localStorage.setItem('role', 'adopter');
              localStorage.setItem('homeurl', '/user/adopter-home');
              //alert(localStorage.getItem('userid'));
              this.router.navigate(['/user/adopter-home']);
            } else if (response.status && response.isowner) {
              this.refresh();
              this.msg = 'Account not exist for adopter role. Please login as owner or register as adopter.';
              this.router.navigate(['/user/login']);
            } else {
              this.refresh();
              this.msg = response.msg;
              this.router.navigate(['/user/login']);
            }
          },
          (error) => console.log(error)
        );
    }
  }

  refresh() {
    this.user.email = '';
    this.user.password = '';
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  checkLogin(){
    if(localStorage.getItem('userid') != ''){
      this.router.navigate(['/homepage']);
    }
  }
}
