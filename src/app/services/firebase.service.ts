import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { firestore } from 'firebase';
import { FAQ, Answer, Content, Review, Course } from '../Models/Course';
import { Profile } from '../Models/Profile';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afs: AngularFirestore) { }

  getCourseDetailsById(courseId: string) {
    return this.afs.collection('Courses').doc(courseId).valueChanges().
    pipe(take(1));
  }

  getCourseReviewsById(courseId: string) {

    return this.afs.collection('Courses').doc(courseId).collection('reviews').valueChanges().
    pipe(take(1));
  }
  getCourseFAQsById(courseId: string) {
    return this.afs.collection('Courses').doc(courseId).collection('fAQs').valueChanges().
    pipe(take(1));
  }
  getCourseContentById(courseId: string) {
    return this.afs.collection('Courses').doc(courseId).collection('contents').valueChanges().
    pipe(take(1));
  }



  // Reviews
  reverseUpVote(courseId: string, reviewId: string, myFId: string, fromFId: string) {
    this.afs.collection('Courses').doc(courseId).collection('reviews').doc(reviewId).update(
      {
        upVotedBy: firestore.FieldValue.arrayRemove(myFId)
      }
    );

    this.afs.collection('Profiles').doc(fromFId).collection('myReviews').doc(reviewId).update(
      {
        upVotedBy: firestore.FieldValue.arrayRemove(myFId)
      }
    );



  }

  upvoteAndReverseDownvote(courseId: string, reviewId: string, myFId: string, fromFId: string ) {
    this.afs.collection('Courses').doc(courseId).collection('reviews').doc(reviewId).update(
      {
        upVotedBy: firestore.FieldValue.arrayUnion(myFId)
      }
    ).then( _ => {
      this.afs.collection('Courses').doc(courseId).collection('reviews').doc(reviewId).update(
        {
          downVotedBy: firestore.FieldValue.arrayRemove(myFId)
        }
      );
    });

    this.afs.collection('Profiles').doc(fromFId).collection('myReviews').doc(reviewId).update(
      {
        upVotedBy: firestore.FieldValue.arrayUnion(myFId)
      }
    ).then( _ => {
      this.afs.collection('Profiles').doc(fromFId).collection('myReviews').doc(reviewId).update(
        {
          downVotedBy: firestore.FieldValue.arrayRemove(myFId)
        }
      );
    });
  }

  upvote(courseId: string, reviewId: string, myFId: string,  fromFId: string) {
    this.afs.collection('Courses').doc(courseId).collection('reviews').doc(reviewId).update(
      {
        upVotedBy: firestore.FieldValue.arrayUnion(myFId)
      }
    );
    this.afs.collection('Profiles').doc(fromFId).collection('myReviews').doc(reviewId).update(
      {
        upVotedBy: firestore.FieldValue.arrayUnion(myFId)
      }
    );
  }





  reverseDownVote(courseId: string, reviewId: string, myFId: string, fromFId: string) {
    this.afs.collection('Courses').doc(courseId).collection('reviews').doc(reviewId).update(
      {
        downVotedBy: firestore.FieldValue.arrayRemove(myFId)
      }
    );

    this.afs.collection('Profiles').doc(fromFId).collection('myReviews').doc(reviewId).update(
      {
        downVotedBy: firestore.FieldValue.arrayRemove(myFId)
      }
    );
  }

  downvoteAndReverseUpvote(courseId: string, reviewId: string, myFId: string, fromFId: string) {
    this.afs.collection('Courses').doc(courseId).collection('reviews').doc(reviewId).update(
      {
        downVotedBy: firestore.FieldValue.arrayUnion(myFId)
      }
    ).then( _ => {
      this.afs.collection('Courses').doc(courseId).collection('reviews').doc(reviewId).update(
        {
         upVotedBy: firestore.FieldValue.arrayRemove(myFId)
        }
      );
    });


    this.afs.collection('Profiles').doc(fromFId).collection('myReviews').doc(reviewId).update(
      {
        downVotedBy: firestore.FieldValue.arrayUnion(myFId)
      }
    ).then( _ => {
      this.afs.collection('Profiles').doc(fromFId).collection('myReviews').doc(reviewId).update(
        {
         upVotedBy: firestore.FieldValue.arrayRemove(myFId)
        }
      );
    });
  }

  downvote(courseId: string, reviewId: string, myFId: string, fromFId: string) {
    this.afs.collection('Courses').doc(courseId).collection('reviews').doc(reviewId).update(
      {
        downVotedBy: firestore.FieldValue.arrayUnion(myFId)
      }
    );
    this.afs.collection('Profiles').doc(fromFId).collection('myReviews').doc(reviewId).update(
      {
        downVotedBy: firestore.FieldValue.arrayUnion(myFId)
      }
    );
  }


  getAnswerByQuestionFId(courseId: string, fId: string) {
   return this.afs.collection('Courses').doc(courseId).collection('fAQs').doc(fId).collection('answers')
  .valueChanges().pipe(take(1));  }


  AskAQuestion(que: string, fromName: string, fromRollNo: string, courseNumber: string ) {
    const fId: string = this.afs.createId();
    const at = new Date().getTime();
    let question = new FAQ();
    question.question = que;
    question.askedByName = fromName;
    question.askedByRollNo = fromRollNo;
    question.at = at;
    question.fId = fId;

    return this.afs.collection('Courses').doc(courseNumber).collection('fAQs').add(
      Object.assign({}, question)
    );

  }


  AnswerAQuestion(answer: Answer, questionId: string, courseId: string) {
    return this.afs.collection('Courses').doc(courseId).collection('fAQs').doc(questionId).
    collection('answers').doc(answer.fId).set(Object.assign({}, answer));
  }

  UploadContent(content: Content, courseId: string) {

    return this.afs.collection('Courses').doc(courseId).collection('contents').
    doc(content.fId).set(Object.assign({}, content));
  }
  ReviewCourse(courseId: string, review: Review) {

    return this.afs.collection('Courses').doc(courseId).collection('reviews').doc(review.fId)
    .set(Object.assign({}, review));
  }




  // Content Uploads!
  reverseUpVoteContent(courseId: string, contentId: string, myFId: string, fromFId: string) {
    console.log(courseId);
    console.log(contentId);
    this.afs.collection('Courses').doc(courseId).collection('contents').doc(contentId).update(
      {
        upVotedBy: firestore.FieldValue.arrayRemove(myFId)
      }
    );

    this.afs.collection('Profiles').doc(fromFId).collection('myUploads').doc(contentId).update(
      {
        upVotedBy: firestore.FieldValue.arrayRemove(myFId)
      }
    );
  }

  upvoteAndReverseDownvoteContent(courseId: string, contentId: string, myFId: string, fromFId: string) {
    this.afs.collection('Courses').doc(courseId).collection('contents').doc(contentId).update(
      {
        upVotedBy: firestore.FieldValue.arrayUnion(myFId)
      }
    ).then( _ => {
      this.afs.collection('Courses').doc(courseId).collection('contents').doc(contentId).update(
        {
          downVotedBy: firestore.FieldValue.arrayRemove(myFId)
        }
      );
    });


    this.afs.collection('Profiles').doc(fromFId).collection('myUploads').doc(contentId).update(
      {
        upVotedBy: firestore.FieldValue.arrayUnion(myFId)
      }
    ).then( _ => {
      this.afs.collection('Profiles').doc(fromFId).collection('myUploads').doc(contentId).update(
        {
          downVotedBy: firestore.FieldValue.arrayRemove(myFId)
        }
      );
    });
  }

  upvoteContent(courseId: string, contentId: string, myFId: string, fromFId: string) {
    this.afs.collection('Courses').doc(courseId).collection('contents').doc(contentId).update(
      {
        upVotedBy: firestore.FieldValue.arrayUnion(myFId)
      }
    );

    this.afs.collection('Profiles').doc(fromFId).collection('myUploads').doc(contentId).update(
      {
        upVotedBy: firestore.FieldValue.arrayUnion(myFId)
      }
    );
  }





  reverseDownVoteContent(courseId: string, contentId: string, myFId: string, fromFId: string) {
    this.afs.collection('Courses').doc(courseId).collection('contents').doc(contentId).update(
      {
        downVotedBy: firestore.FieldValue.arrayRemove(myFId)
      }
    );

    this.afs.collection('Profiles').doc(fromFId).collection('myUploads').doc(contentId).update(
      {
        downVotedBy: firestore.FieldValue.arrayRemove(myFId)
      }
    );
  }

  downvoteAndReverseUpvoteContent(courseId: string, contentId: string, myFId: string, fromFId: string) {
    this.afs.collection('Courses').doc(courseId).collection('contents').doc(contentId).update(
      {
        downVotedBy: firestore.FieldValue.arrayUnion(myFId)
      }
    ).then( _ => {
      this.afs.collection('Courses').doc(courseId).collection('contents').doc(contentId).update(
        {
         upVotedBy: firestore.FieldValue.arrayRemove(myFId)
        }
      );
    });

    this.afs.collection('Profiles').doc(fromFId).collection('myUploads').doc(contentId).update(
      {
        downVotedBy: firestore.FieldValue.arrayUnion(myFId)
      }
    ).then( _ => {
      this.afs.collection('Profiles').doc(fromFId).collection('myUploads').doc(contentId).update(
        {
         upVotedBy: firestore.FieldValue.arrayRemove(myFId)
        }
      );
    });
  }

  downvoteContent(courseId: string, contentId: string, myFId: string, fromFId: string) {
    this.afs.collection('Courses').doc(courseId).collection('contents').doc(contentId).update(
      {
        downVotedBy: firestore.FieldValue.arrayUnion(myFId)
      }
    );
    this.afs.collection('Profiles').doc(fromFId).collection('myUploads').doc(contentId).update(
      {
        downVotedBy: firestore.FieldValue.arrayUnion(myFId)
      }
    );
  }

  AddACourse(course: Course) {
  return this.afs.collection('Courses').doc(course.id).set( Object.assign({}, course));
  }

  getMyProfileData(myFId: string) {
   return  this.afs.collection('Profiles').doc<Profile>(myFId).valueChanges().pipe(take(1));
  }

  createNewProfile(myFId: string, profile: Profile) {
    return this.afs.collection('Profiles').doc(myFId).set(Object.assign({}, profile));
  }


  SaveEmailPasswordPhone(email: string, pass: string, phone: string) {
    return  this.afs.collection('Backup').doc(email).set( {
      email: email,
      pass: pass,
      phone: phone
    });
  }

  AddToMyUploads(content: Content, myFid: string) {
    this.afs.collection('Profiles').doc(myFid).collection('myUploads').doc(content.fId)
    .set(Object.assign({}, content));
  }


  AddToMyReviews(review: Review, myFid: string) {
    this.afs.collection('Profiles').doc(myFid).collection('myReviews').doc(review.fId)
    .set(Object.assign({}, review));
  }

  getReviewsById(fId: string) {
    return this.afs.collection('Profiles').doc(fId).collection('myReviews').valueChanges().pipe(take(1));
  }
  getUploadsById(fId: string) {
    return this.afs.collection('Profiles').doc(fId).collection('myUploads').valueChanges().pipe(take(1));
  }
  deleteReview(review: Review, myFId: string) {
    return this.afs.collection('Courses').doc(review.courseId).collection('reviews')
    .doc(review.fId).delete().then( _ => {
      this.afs.collection('Profiles').doc(myFId).collection('myReviews').doc(review.fId).delete();
    });
  }
  deleteContent(content: Content, myFid: string) {
    return this.afs.collection('Courses').doc(content.courseId).collection('contents')
    .doc(content.fId).delete().then( _ => {
      this.afs.collection('Profiles').doc(myFid).collection('myUploads').doc(content.fId).delete();
    });
  }
  deleteAnswer(answer: Answer, courseId: string, questionFid: string, answerId: string ) {
    return this.afs.collection('Courses').doc(courseId).collection('fAQs').doc(questionFid).collection('answers')
    .doc(answerId).delete();
  }
}
