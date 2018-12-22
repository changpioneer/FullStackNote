import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule} from '@angular/forms';
import { PhoneValidatorDirective } from './register/phone-validator.directive';
import { ImageCodeValidatorDirective } from './register/image-code-validator.directive';

@NgModule({
  declarations: [
    UserComponent,
    LoginComponent,
    RegisterComponent,
    PhoneValidatorDirective,
    ImageCodeValidatorDirective,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }
