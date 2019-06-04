import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { RouterModule} from '@angular/router';
import { AppRoutingModule} from './app-routing/app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Http, HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-modal';

import { AppComponent } from './app.component';
import { NavComponent } from './navigation/nav/nav.component';
import { LoginComponent } from './login/login.component';
import { AdopterHomeComponent } from './adopter/adopter-home/adopter-home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { HomepageComponent } from './homepage/homepage.component';

import { HomepageService } from './homepage/homepage.service';
import { CommunitySectionComponent } from './homepage/community-section/community-section.component';
import { PetSectionComponent } from './homepage/pet-section/pet-section.component';
import { RegisterComponent } from './login/register/register.component';
import { BrowsePetsComponent } from './search/browse-pets/browse-pets.component';
import { DetailPetComponent } from './search/detail-pet/detail-pet.component';
import { ContactCardComponent } from './message/contact-card/contact-card.component';
import { AdopterNavComponent } from './adopter/adopter-nav/adopter-nav.component';
import { AdopterProfileComponent } from './adopter/adopter-profile/adopter-profile.component';
import { MessageListComponent } from './message/message-list/message-list.component';
import { MessageDetailComponent } from './message/message-detail/message-detail.component';
import { BookmarkSaveComponent } from './bookmark/bookmark-save/bookmark-save.component';
import { BookmarkListComponent } from './bookmark/bookmark-list/bookmark-list.component';
import { OwnerHomeComponent } from './owner/owner-home/owner-home.component';
import { OwnerNavComponent } from './owner/owner-nav/owner-nav.component';
import { CommunityHomeComponent } from './community/community-home/community-home.component';
import { OwnerPetListComponent } from './owner/owner-pet-list/owner-pet-list.component';

import { AdopterProfileService } from './adopter/adopter-profile/adopter-profile.service';
import { PetSectionService } from './homepage/pet-section/pet-section.service';
import { OwnerPetListService } from './owner/owner-pet-list/owner-pet-list.service';
import { ArticleComponent } from './community/article/article.component';
import { DetailPetService } from './search/detail-pet/detail-pet.service';
import { BookmarkListService } from './bookmark/bookmark-list/bookmark-list.service';
import { FacebookModule } from 'ngx-facebook';
import { Article2Component } from './community/article/article2/article2.component';
import { Article3Component } from './community/article/article3/article3.component';
import { Article4Component } from './community/article/article4/article4.component';
import { Article5Component } from './community/article/article5/article5.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    AdopterHomeComponent,
    AdminHomeComponent,
    HomepageComponent,
    CommunitySectionComponent,
    PetSectionComponent,
    RegisterComponent,
    BrowsePetsComponent,
    DetailPetComponent,
    ContactCardComponent,
    AdopterNavComponent,
    AdopterProfileComponent,
    MessageListComponent,
    MessageDetailComponent,
    BookmarkSaveComponent,
    BookmarkListComponent,
    OwnerHomeComponent,
    OwnerNavComponent,
    CommunityHomeComponent,
    OwnerPetListComponent,
    ArticleComponent,
    Article2Component,
    Article3Component,
    Article4Component,
    Article5Component,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ModalModule,
    FacebookModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDZkg5PC6seKByVvyizkcFsHTZXr7XMHPY'
    })
  ],
  providers: [HomepageService,
              AdopterProfileService,
              PetSectionService,
              OwnerPetListService,
              DetailPetService,
              BookmarkListService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
