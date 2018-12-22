import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {UserModule} from './user/user.module';
import { HomeComponent } from './home/home.component';
import {MainModule} from './main/main.module';
import {MyCompModule} from './my-comp/my-comp.module';


@NgModule({
  declarations: [ // 声明组件，才能正常使用
    AppComponent, HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UserModule,
    MainModule,
    MyCompModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
