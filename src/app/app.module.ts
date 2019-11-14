import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthService} from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from 'angularfire2';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthGaurd} from '../app/Gaurd/auth.gaurd';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'; 
import { MatMenuModule} from '@angular/material/menu'; 
import { AngularFireStorageModule } from 'angularfire2/storage';
import { from } from 'rxjs';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService} from './services/firebase.service';
import { AddACourseComponent } from './components/add-acourse/add-acourse.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomepageComponent, canActivate: [AuthGaurd]},
  {path: 'course/:id', component: CourseDetailsComponent, canActivate: [AuthGaurd] },
  {path: 'addcourse', component: AddACourseComponent, canActivate: [AuthGaurd]},
  { path: 'verifyEmail', component: VerifyEmailComponent, canActivate: [AuthGaurd]  },
  { path: 'myprofile', component: MyprofileComponent, canActivate: [AuthGaurd] },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGaurd] }
];
const firebaseConfig = {
  apiKey: 'AIzaSyDTH-g81IT0-2k6YjDoWadDqpp8YSV1on0',
  authDomain: 'coursehiveiitm.firebaseapp.com',
  databaseURL: 'https://coursehiveiitm.firebaseio.com',
  projectId: 'coursehiveiitm',
  storageBucket: 'gs://coursehiveiitm.appspot.com',
  messagingSenderId: '942581340538',
  appId: '1:942581340538:web:5e65ccc75d0ccc5773dec3'
};

@NgModule({
  declarations: [
    
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomepageComponent,
    CourseDetailsComponent,
    AddACourseComponent,
    VerifyEmailComponent,
    MyprofileComponent,
    FooterComponent,
    ProfileComponent
  ],
  imports: [BrowserAnimationsModule,
    NgbModule,
    MatTabsModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    AngularFireStorageModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload' }),
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [AngularFireAuth,
     AuthService,
      AuthGaurd,
      AngularFirestore,
      FirebaseService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
