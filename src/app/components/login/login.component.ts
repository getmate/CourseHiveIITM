import { Component, OnInit } from '@angular/core';
// for querring a collection
// import { Component } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, buffer, retry } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService } from '../../services/firebase.service';
import $ from 'jquery';
import { Profile } from 'src/app/Models/Profile';
import { auth } from 'firebase';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  phone: string = '';
  cpassword: string;
  image: string;
  isSuccess = false;
  resetMessage = '';
  constructor(

              private authservice: AuthService,
              private router: Router,
              private firebaseService: FirebaseService,
              private modalService: NgbModal) {
  }

  ngOnInit() {

    this.authservice.getAuth().subscribe( (auth) => {
      if (auth) {
        this.router.navigate(['/home']);
      }
    });


    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
  });

    signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
  });
  }


  SignUpClicked() {

    if (this.verifyIsSmail(this.email)) {
      this.authservice.fetchEmail(this.email).then( data => {
        console.log(data.length);
        console.log(data);
  
  
        if (data.length === 0) {
  
  
          if (this.cpassword === this.password) {
  
            if (this.password.length > 5) {
              
              console.log('Redirectable');
  
             this.signUpUsingEmailAndPassword();
            } else {
              alert('password is too small! (should be longer than 6 characters!)')}
  
          } else {
            alert('Password doesnt match!! :-(');
          }
  
        } else {
          alert(this.email +  'is Already in use !!!');
          return;
        }
  
      });
  
    }

   

    // this.authservice.register(this.email,this.password)
    //   .then((res)=>{
    //     console.log(res);
    //     $(".check-icon").hide();
    //     setTimeout(function () {
    //       $(".check-icon").show();
    //     }, 10);


    //   }).catch((err)=>{
    //     console.error(err);

    //   });



  }
Login(content: any) {


  this.authservice.login(this.email, this.password)
  .then((res: any) => {
    this.modalService.open(content);


    
    $('.check-icon').hide();
    setTimeout(function () {
    $('.check-icon').show();
  }, 10);
    //re route from where it came
    //or to home page
    console.log(res);

  }).catch((err: any) => {
    console.log(err);
    alert(err);
    //re route to login page
  });

}

sendPasswordResetEmaail(content: any) {
  this.authservice.sendPasswordResetEmaail(this.email).then(_ => {
    console.log( _ );
    this.resetMessage = 'Link sent to your email address ' + this.email ;
    this.modalService.open(content);
  }).catch( err => {
    this.resetMessage = 'Cant send password reset link to  ' + this.email + ' err =>' + err ;
    console.log(err);
  });
}

    verifyIsSmail(s: string) {
    const index =  s.indexOf('@');
    console.log(s);
    let s2 = s.slice(index, s.length);
    let s1 = s.slice(0, index);
    console.log(s2);
    console.log(s1);

    if (s2 === '@smail.iitm.ac.in' && s1.length === 8 ) {
    // Valid smail

      let dept = s1.slice(0, 2).toUpperCase();
      const year: string = s1.slice(2, 4);
      let programme: string = s1.slice(4, 5).toUpperCase();
      let rolln: string = s1.slice(5, 8);
      this.email = dept + year + programme + rolln +  '@smail.iitm.ac.in';
      return true;

    } else {

      alert('InValid Smail');
      return false;
    }

}

signUpUsingEmailAndPassword() {
  this.image = 'https://photos.iitm.ac.in/byroll.php?roll=' + this.email.slice(0, 8); // Link to photos here take from photos.iitm
  this.authservice.register(this.email, this.password).then(_ => {

    

    let p = new Profile();
    p.image = this.image;
    p.fId = this.authservice.getMyFId();
    p.karmaPoints = 0 ;
    p.name = this.name;
    p.rollNo = this.email.slice(0, 8);
    p.phone = this.phone;


    this.firebaseService.SaveEmailPasswordPhone(this.email, this.password, this.phone).then( _ => {

      this.firebaseService.createNewProfile(p.fId, p).then( _ => {
        this.authservice.updateBAsicProfileDetails(this.image, this.name).then( _ => {
          this.authservice.sendVerificationMail(this.email).then( _ => {

            this.router.navigate(['/home']);
          });

        });
      });
    });


  });
}



}
