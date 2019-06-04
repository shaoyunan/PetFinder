import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bookmark } from '../../../model/bookmark.model';
import { BookmarkListService } from './../../../bookmark/bookmark-list/bookmark-list.service';
import { FacebookService, UIParams, UIResponse,InitParams} from 'ngx-facebook';

@Component({
  selector: 'app-article3',
  templateUrl: './article3.component.html',
  styleUrls: ['./article3.component.scss']
})
export class Article3Component implements OnInit {

  public href: string = "http://localhost:4200/#";
  bookmark:Bookmark ={} as any;
  
  
  constructor(private router: Router,
    private bookmarkListService:BookmarkListService,
    private fb: FacebookService
   ) { 
      let initParams: InitParams = {
        appId: '118955548964341',
        xfbml: true,
        version: 'v2.8'
      };
   
      fb.init(initParams);  

   
    }
  

  ngOnInit() {
    console.log(this.router.url);
   this.bookmark.tag="article";
   this.bookmark.url=this.href+this.router.url;
  }

  
  setBookmark = () => {

    this.bookmarkListService.addBookmark(this.bookmark)
      .subscribe((res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
            }
      );

  }
  
  share(url: string) {
    
     let params: UIParams = {
        href: 'https://github.com/zyra/ngx-facebook',
       method: 'share'
     };
    
     this.fb.ui(params)
       .then((res: UIResponse) => console.log(res))
       .catch((e: any) => console.error(e));
    
   }

}
