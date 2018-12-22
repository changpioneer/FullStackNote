import {Component, OnInit} from '@angular/core';
import {RegisterUser} from './register-user';
import {UserService} from '../user.service';
import {catchError, take} from 'rxjs/operators';
import {Result} from '../../common/result';
import {interval, of} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: RegisterUser;
  codeImgSrc = '';
  isDisabled = false;
  btnText = '获取短信验证码'; // 动态按钮文字

  constructor(private us: UserService, private router: Router) {
    this.model = new RegisterUser();
  }

  ngOnInit() {
    this.getCodeImg();
  }

  getCodeImg() {
    this.us.getCodeImg().subscribe((result) => {
      if (result.success) {
        this.codeImgSrc = 'data:image/png;base64,' + result.data;
      } else {
        alert('获取验证码失败，请重试！');
      }
    }, (err) => {
      console.log(err);
      alert('获取验证码失败，请重试！');
    });
  }


  getCodeSms() {
    this.us.getCodeSms(this.model.phone).subscribe((result: Result<string>) => {
        if (result.success) {
          // 获取成功: 开启60s倒计时，禁用按钮
          this.isDisabled = true;
          interval(1000).pipe(take(60))
            .subscribe(i => {
              i = 60 - i;
              if (i > 1) {

                this.btnText = i + 's';
              } else {
                this.btnText = '获取短信验证码';
                this.isDisabled = false;
              }
            });
        } else {
          alert('获取验证码失败，请重试！');
        }
      },
      catchError(err => of())
    );
  }


  register() {
    this.us.register(this.model).subscribe((result) => {
      if (result.success) {
        // 注册成功，调转到主页
        this.router.navigate(['main']);
      } else {
        alert('注册失败');
      }
    });
  }

}
