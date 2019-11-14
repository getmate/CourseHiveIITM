import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { Profile } from 'src/app/Models/Profile';
import { Content, Review } from 'src/app/Models/Course';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  profile: Profile = new Profile();
  myFId: string = '';
  karmaPoints: number = 0;
  reviews: number = 0;
  uploads: number = 0;
  constructor(private authService: AuthService,
              private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.myFId =  this.authService.getMyFId();
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

  DeleteReview(review: Review) {
    this.firebaseService.deleteReview( review, this.myFId).then( _ => {
      this.profile.myReviews.splice(this.profile.myReviews.indexOf(review), 1);
    });
  }

  DeleteContent(content: Content) {
    this.firebaseService.deleteContent( content, this.myFId).then( _ => {
      this.profile.myUploads.splice(this.profile.myUploads.indexOf(content), 1);
    });
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
