import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Result} from '../../../common/result';
import {map} from 'rxjs/operators';


export interface Course {
  id: number;
  name: string;
  phase: string;
  poster: string;
}

@Injectable({
  providedIn: 'root'
})
export class UCourseService {

  url = '/api/user/';

  constructor(private http: HttpClient) {
  }

  getMyCourses() {
    return this.http.get<Result<Course[]>>(this.url + 'my-courses')
      .pipe(
        map((result: Result<Course[]>) => result.data)
      );
  }
}
