import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { HomepageComponent} from './../homepage/homepage.component';
import { LoginComponent } from './../login/login.component';
import { BrowsePetsComponent } from './../search/browse-pets/browse-pets.component';
import { DetailPetComponent } from './../search/detail-pet/detail-pet.component';
import { AdopterHomeComponent } from './../adopter/adopter-home/adopter-home.component';
import { RegisterComponent } from './../login/register/register.component';
import { OwnerHomeComponent } from './../owner/owner-home/owner-home.component';
import { MessageListComponent } from './../message/message-list/message-list.component';
import { MessageDetailComponent } from './../message/message-detail/message-detail.component';
import { CommunityHomeComponent } from './../community/community-home/community-home.component';
import { ArticleComponent } from './../community/article/article.component';
import { Article2Component } from './../community/article/article2/article2.component';
import { Article3Component } from './../community/article/article3/article3.component';
import { Article4Component } from './../community/article/article4/article4.component';
import { Article5Component } from './../community/article/article5/article5.component';
import { AdopterProfileComponent } from './../adopter/adopter-profile/adopter-profile.component';


import {Pet} from './../model/pet.model';

// import { AuthGaurdService,Role } from './../auth/auth.gaurd';


// import { PurchaselistComponent } from './../funder/purchaselist/purchaselist.component';
// import { FunderHomeComponent} from './../funder/funder-home/funder-home.component';


// imports
import {Routes}from '@angular/router';


const routes: Routes = [
   {path: 'homepage', component: HomepageComponent/*, data:{role:Role.Guest}*/},
   {path: 'user/login', component: LoginComponent},
   {path: 'search', component: BrowsePetsComponent},
   {path: 'search/pet/:petid', component: DetailPetComponent,data:{petid:String}},
   {path: 'user/adopter-home', component: AdopterHomeComponent},
   {path: 'user/register', component: RegisterComponent},
   {path: 'user/owner-home', component: OwnerHomeComponent},
   {path: 'user/owner-home/profile', component: AdopterProfileComponent},   
   {path: 'owner/message-list', component: MessageListComponent},
   {path: 'adopter/message-list', component: MessageListComponent},
   {path: 'adopter/view-pet', component: DetailPetComponent},
   {path: 'message-list/message', component: MessageDetailComponent},
   {path: 'community', component: CommunityHomeComponent},
   {path: 'article', component: ArticleComponent},
   {path: 'community/article/1', component: ArticleComponent},
   {path: 'community/article/2', component: Article2Component},
   {path: 'community/article/3', component: Article3Component},
   {path: 'community/article/4', component: Article4Component},
   {path: 'community/article/5', component: Article5Component},

  // {path: 'home', component: AdminHomeComponent, canActivate:[AuthGaurdService],data:{role:Role.Admin} },
  // {path: 'admin-startup', component: AdminStartupComponent, canActivate:[AuthGaurdService],data:{role:Role.Admin} },

  // {path: 'login', component:LoginComponent,data:{role:Role.Guest}  },
  // {path: 'register', component: RegistrationComponent,data:{role:Role.Guest}  },
  // {path: '', redirectTo: '/login', pathMatch: 'full'},
  // {path: '**', component: LoginComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash: true}),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
