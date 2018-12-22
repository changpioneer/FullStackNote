import {Component, OnInit} from '@angular/core';
import {LoginUser} from './login-user';
import {UserService} from '../user.service';
import {Result} from '../../common/result';
import {User} from '../../common/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: LoginUser;

  constructor(private userService: UserService, private router: Router) {
    this.model = new LoginUser();
  }

  ngOnInit() {
  }

  login() {
    console.log(this.model);
    this.userService.login(this.model).subscribe(
      (result: Result<User>) => {
        if (result.success) {
          // 登录成功，调转到主页
          this.router.navigate(['main']);
        } else {
          alert('登录失败');
        }
      },
      (error: any) => {
        console.log(error);
        alert('登录失败');
      }
    )
    ;
  }

}
