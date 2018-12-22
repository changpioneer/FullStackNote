import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-father',
  templateUrl: './father.component.html',
  styleUrls: ['./father.component.css']
})
export class FatherComponent implements OnInit, AfterViewInit {

  names = ['mack', ' ', ' jack '];

  @ViewChild('child2') child2: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  onMyChange(newName) {
    alert('改名为' + newName);
  }

  ngAfterViewInit(): void {
    console.log(this.child2['age']);
  }

}
