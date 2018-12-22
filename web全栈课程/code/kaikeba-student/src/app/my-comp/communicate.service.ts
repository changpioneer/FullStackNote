import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicateService {

  constructor() {
  }

  // 发送数据源
  private subject = new Subject<string>();
  // 消费者用来监听的Observable
  ob: Observable<string> = this.subject.asObservable();

  emit(msg: string) {
    this.subject.next(msg);
  }
}
