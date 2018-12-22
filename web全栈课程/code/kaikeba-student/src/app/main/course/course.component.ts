import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    // route.paramMap.subscribe((pm: ParamMap) => {
    //   console.log(pm.get('id'));
    //   console.log(pm.get('username') + '--', pm.get('age'));
    // });
    //
    // route.queryParamMap.subscribe((pm: ParamMap) => {
    //   console.log(pm.get('sex'));
    // });
  }

  ngOnInit() {
  }

}
