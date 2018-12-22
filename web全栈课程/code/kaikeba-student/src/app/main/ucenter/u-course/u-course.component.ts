import {Component, OnInit} from '@angular/core';
import {Course, UCourseService} from './u-course.service';

@Component({
  selector: 'app-u-course',
  templateUrl: './u-course.component.html',
  styleUrls: ['./u-course.component.css']
})
export class UCourseComponent implements OnInit {

  isHidden = false;
  courses: Course[];

  constructor(private cs: UCourseService) {
  }

  ngOnInit() {
    this.cs.getMyCourses().subscribe(
      result => {
        this.courses = result;
        console.log(this.courses);
      }
    );
  }

}
