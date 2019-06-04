import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  keyword: string = '';

  constructor() { }

  ngOnInit() {
  }

  searchChange() {
      localStorage.setItem('searchURL', "http://localhost:4000/pets/searchbykeyword?keyword=" + this.keyword);
  }
}
