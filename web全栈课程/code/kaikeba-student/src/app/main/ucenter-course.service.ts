import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Result} from '../common/result';

@Injectable({
  providedIn: 'root'
})
export class UcenterCourseService {

  url = 'api/search/';

  constructor(private http: HttpClient) {
  }


  searchCourse(keyword) {
    const params = new HttpParams()
      .append('keyword', keyword);
    return this.http.get<Result<any[]>>(this.url + 'courses', {params});
  }
}
