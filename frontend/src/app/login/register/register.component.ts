import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  user: User = new User()
  isowner: boolean = false;
  msg: string = ''

  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
    this.checkLogin();
    this.refresh();
  }

  registerUser() {
    if (this.user.email == '') {
      this.msg = 'Email cannot be empty!';
    } else if (this.user.password == '') {
      this.msg = 'Password cannot be empty!';
    } else if (!this.validateEmail(this.user.email)) {
      this.msg = 'Invalid Email'
    }else if (!this.validatePwd(this.user.password)) {
      this.msg = 'Password must contain at least 8 characters with 1 letter and 1 number.'
    } else {
      this.registerService.registerUser(this.user, this.isowner)
        .subscribe(
          (response) => {
            if (response.status) {
              console.log('register - ' + response.status + response.isowner);
              this.router.navigate(['/user/login']);
            } else {
              this.refresh();
              this.msg = response.msg;
              this.router.navigate(['/user/register']);
            }
          },
          (error) => console.log(error)
        );
    }
  }

  selectRole(role: string) {
    console.log('selectRole - ' + role);
    if (role == 'adopter') {
      this.isowner = false;
    } else if (role == 'owner') {
      this.isowner = true;
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
  validatePwd(pwd) {
    var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(String(pwd).toLowerCase());
  }

  checkLogin(){
      if(localStorage.getItem('userid') != ''){
        this.router.navigate(['/homepage']);
      }
    }
}
