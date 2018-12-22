import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu/menu.component';
import {RouterModule} from '@angular/router';
import {PanelComponent} from './panel/panel.component';

@NgModule({
  declarations: [MenuComponent, PanelComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [MenuComponent, PanelComponent]
})
export class MyComModule {
}
