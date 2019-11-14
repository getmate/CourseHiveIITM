import { Component, OnInit } from '@angular/core';

import { AuthService} from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { Profile } from 'src/app/Models/Profile';
import {ActivatedRoute, Params} from '@angular/router';
import { Content, Review } from 'src/app/Models/Course';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile = new Profile();
  myFId: string = '';
  karmaPoints: number = 0;
  reviews: number = 0;
  uploads: number = 0;
  constructor(private authService: AuthService,
              private firebaseService: FirebaseService,
              private activatedRoutes: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoutes.params.subscribe( (params: Params) => {
      this.myFId = params.id;
    });
    this.firebaseService.getMyProfileData(this.myFId).subscribe( (_doc) => {

        this.profile = _doc;

        if (_doc !== undefined) {
          this.firebaseService.getUploadsById(this.myFId).subscribe( (data: Content[]) => {
            if (data === undefined) {
              this.profile.myUploads = [];
            } else {

              this.profile.myUploads = data;
              this.calculate();
            }
          });
          this.firebaseService.getReviewsById(this.myFId).subscribe( (data: Review[]) => {
            if (data === undefined) {
              this.profile.myReviews = [];
            } else {

            this.profile.myReviews = data;
            this.calculate();
            }
          });
        }
      } );
  }
  isMyUploadsDefined() {
    if (this.profile.myUploads !== undefined) {
      if ( this.profile.myUploads.length > 0 ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isMyReviewsDefined() {
    if (this.profile.myReviews !== undefined) {
      if ( this.profile.myReviews.length > 0 ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getDate(n: number) {
    let s: string = new Date(n).toDateString();
    return s;
  }



  calculate() {
    this.uploads = this.profile.myUploads.length;
    this.reviews = this.profile.myReviews.length;

    this.profile.myUploads.forEach((element: Content) => {
      this.karmaPoints = (element.upVotedBy.length * 5) + this.karmaPoints;
      this.karmaPoints =   this.karmaPoints - (element.downVotedBy.length * 5);

    });

    this.profile.myReviews.forEach((element: Review) => {
      this.karmaPoints = (element.upVotedBy.length * 5) + this.karmaPoints;
      this.karmaPoints =   this.karmaPoints - (element.downVotedBy.length * 5);

    });
  }
    // For Reviews
    IUpvoted(upvotedBy: string[]) {
      if (upvotedBy.includes(this.myFId)) {
        return true;
      } else {
        return false;
      }
    }
    IDownVoted(downVotedBy: string[]) {
      if (downVotedBy.includes(this.myFId)) {
        return true;
      } else {
        return false;
      }
    }
    // For Course Content
    IUpvotedContent(upvotedBy: string[]) {
      if (upvotedBy.includes(this.myFId)) {
        return true;
      } else {
        return false;
      }
    }
    IDownVotedContent(downVotedBy: string[]) {
      if (downVotedBy.includes(this.myFId)) {
        return true;
      } else {
        return false;
      }
    }

    DownloadClicked(link: string) {
      window.open(link, '_blank');
    }


}
