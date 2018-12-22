import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FatherComponent} from './father/father.component';

const routes: Routes = [
  {path: 'my-comp', component: FatherComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCompRoutingModule {
}
