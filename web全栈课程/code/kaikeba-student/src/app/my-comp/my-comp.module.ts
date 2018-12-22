import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCompRoutingModule } from './my-comp-routing.module';
import { FatherComponent } from './father/father.component';
import { ChildComponent } from './child/child.component';
import { Child2Component } from './child2/child2.component';

@NgModule({
  declarations: [FatherComponent, ChildComponent, Child2Component],
  imports: [
    CommonModule,
    MyCompRoutingModule
  ]
})
export class MyCompModule { }
