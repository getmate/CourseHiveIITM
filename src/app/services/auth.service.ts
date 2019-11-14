import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
interface SignUpData {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 


  constructor(public afAuth: AngularFireAuth,
              public router: Router) {

   }




   login(email: string, password: string) {
     return new Promise((resolve, reject) => {
       this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then(userData => resolve(userData),
      err => reject(err));
     });
   }


   sendVerificationMail(email: string) {
     return this.afAuth.auth.currentUser.sendEmailVerification();
   }

   // get Auth
   getAuth() {
     return this.afAuth.authState.pipe(map(auth => auth));
   }

   getMyFId() {
     return this.afAuth.auth.currentUser.uid;
   }
   logout() {
     this.afAuth.auth.signOut();
     this.router.navigate(['']);
   }

   register(email: string, password: string) {


     return new Promise((resolve, reject) => {
       this.afAuth.auth.createUserWithEmailAndPassword(email, password)
       .then(userData => resolve(userData),
       err => reject(err));
     });
   }

   getMyFirebaseId() {
    return this.afAuth.auth.currentUser.uid;
   }

   updateBAsicProfileDetails(image: string, name: string) {



   return this.afAuth.auth.currentUser.updateProfile(
      {
        displayName: name,
        photoURL: image });
   }


   fetchEmail(email: string) {
   return this.afAuth.auth.fetchSignInMethodsForEmail(email);
   }

   sendPasswordResetEmaail(email: string) {
   return  this.afAuth.auth.sendPasswordResetEmail(email);
   }

   changePassword(email: string , newPass: string) {
        this.afAuth.auth.currentUser.updatePassword(newPass).then( _ => {

        }).catch( err => {

        });
   }

  



}
