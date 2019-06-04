import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adopter-home',
  templateUrl: './adopter-home.component.html',
  styleUrls: ['./adopter-home.component.scss']
})
export class AdopterHomeComponent implements OnInit {

  tag: string = 'profile'

  constructor() { }

  ngOnInit() {
  }


}
