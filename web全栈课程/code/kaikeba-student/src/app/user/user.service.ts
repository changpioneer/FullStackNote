import {Injectable} from '@angular/core';
import {LoginUser} from './login/login-user';
import {HttpClient} from '@angular/common/http';
import {Result} from '../common/result';
import {User} from '../common/user';
import {RegisterUser} from './register/register-user';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'api/user/';
  user: User = null;

  constructor(private http: HttpClient) {
  }

  login(user: LoginUser) {
    return this.http.post<Result<User>>(this.url + 'login', user);
  }

  getCodeImg() {
    return this.http.get<Result<string>>(this.url + 'image-code');
  }

  verifyPhone(phone: string) {
    return this.http.post(this.url + 'verify-phone', {phone});
  }

  verifyImageCode(imageCode: string) {
    return this.http.post(this.url + 'verify-imagecode', {imageCode});
  }

  getCodeSms(phone: string) {
    return this.http.get<Result<string>>('api/code/' + phone);
  }

  register(user: RegisterUser) {
    return this.http.post<Result<User>>(this.url + 'register',
      {phone: user.phone, password: user.password});
  }

  isLogin() {
    return this.http.get<Result<User>>(this.url + 'is-login').pipe(
      map(this.handleLogin.bind(this)),
      catchError(e => of(false))
    );
  }

  logout() {
    return this.http.post<Result<null>>(this.url + 'logout', null).pipe(
      map(result => {
        if (result.success) {
          this.user = null;
          return true;
        }
        return false;
      }),
    );
  }


  private handleLogin(r: Result<User>) {
    if (r.success) {
      // 缓存用户信息
      this.user = r.data;
      // 登录成功
      return true;
    } else {
      return false;
    }
  }
}
