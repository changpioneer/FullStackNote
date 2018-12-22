import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommunicateService} from '../communicate.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  private _name: string;

  @Output()
  myChange: EventEmitter<string> = new EventEmitter<string>();

  get name(): string {
    return this._name;
  }

  @Input()
  set name(value: string) {
    this._name = (value && value.trim()) || 'kong';
  }

  constructor(private cs: CommunicateService) {
  }

  ngOnInit() {
  }

  changeName() {
    this._name = 'aaaaa';
    this.myChange.emit(this._name);
    this.cs.emit('通知另一个子组件改名了: ' + this._name);
  }


}
