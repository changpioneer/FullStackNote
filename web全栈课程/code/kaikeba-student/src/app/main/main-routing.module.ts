import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main.component';
import {UcenterComponent} from './ucenter/ucenter.component';
import {CourseComponent} from './course/course.component';
import {AccountComponent} from './ucenter/account/account.component';
import {CollectionComponent} from './ucenter/collection/collection.component';
import {CommentComponent} from './ucenter/comment/comment.component';
import {UCourseComponent} from './ucenter/u-course/u-course.component';
import {MessageComponent} from './ucenter/message/message.component';

const routes: Routes = [
  {
    path: 'main', component: MainComponent, children: [
      {
        path: 'ucenter', component: UcenterComponent, children: [
          {path: 'account', component: AccountComponent},
          {path: 'collection', component: CollectionComponent},
          {path: 'comment', component: CommentComponent},
          {path: 'course', component: UCourseComponent},
          {path: 'message', component: MessageComponent}
        ]
      },
      {path: 'course', component: CourseComponent},
      {path: '', pathMatch: 'full', redirectTo: '/main/ucenter'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
