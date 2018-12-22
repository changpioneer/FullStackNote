import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {UcenterComponent} from './ucenter/ucenter.component';
import {CourseComponent} from './course/course.component';
import {AccountComponent} from './ucenter/account/account.component';
import {CollectionComponent} from './ucenter/collection/collection.component';
import {CommentComponent} from './ucenter/comment/comment.component';
import {UCourseComponent} from './ucenter/u-course/u-course.component';
import {MessageComponent} from './ucenter/message/message.component';
import {MyComModule} from '../common/my-com.module';
import {NgxUploaderModule} from 'ngx-uploader';

@NgModule({
  declarations: [
    MainComponent,
    UcenterComponent,
    CourseComponent,
    AccountComponent,
    CollectionComponent,
    CommentComponent,
    UCourseComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    MyComModule,
    NgxUploaderModule,
    MainRoutingModule
  ]
})
export class MainModule {
}
