import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { Course } from 'src/app/Models/Course';
//import * as data  from '../../../../u4.json';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  CourseId: string = '';
  total: number = 0;
  done: number = 0;
  constructor(private router: Router,
              private firebaseService: FirebaseService) {

   }

  ngOnInit() {

  }

  SearchClicked() {
    if (this.CourseId.length < 5) {
      alert('Not a Valid CourseId');
      return;
    }
    let s: string = this.makeCourseIdSuitable(this.CourseId);
    this.router.navigate(['/course/' + s]);
  }
  makeCourseIdSuitable(CourseId: string): string {
    let s1 = CourseId.slice(0, 2).toUpperCase();
    let s2 = CourseId.slice(2, 6);
    return s1 + s2;
  }

  KeyDown($event) {
    console.log($event);
    if ($event.key === 'Enter') {
      this.SearchClicked();
    }
  }

  
  // demoFunction() {
  //   this.total = data.default.length;
  //   const coursesList = data.default;
  //   let course: Course = new Course();
  //   for( let i = 0; i < coursesList.length ; i++) {
  //   course = new Course();
  //   // tslint:disable-next-line: no-string-literal
  //   course.id = coursesList[i]['Course No'];
  //   course.credits = coursesList[i]['New Credit'];
  //   course.instructerName = coursesList[i]['Instructor Name'];
  //   course.maxStrength = coursesList[i]['Maxoverallstrength'];
  //   course.name = coursesList[i]['Course Name'];
  //   course.offeredForBTechDD = coursesList[i]['OfferedforBTechDD'];
  //   course.preq = coursesList[i]['Prereq'];
  //   course.room = coursesList[i]['Room'];
  //   course.slot = coursesList[i]['Slot'];
  //   course.additionalSlot = coursesList[i]['Additional Slot'];
  //   console.log(course);

  //   this.firebaseService.AddACourse(course).then( _ => {
  //     this.done = this.done + 1 ;
  //   });

  //   }
  //  }


}
