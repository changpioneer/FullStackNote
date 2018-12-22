import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private us: UserService, private router: Router) {
  }

  ngOnInit() {
    this.us.isLogin().subscribe(result => {
      if (result) {
        // 登录成功，调转到主页
        this.router.navigate(['main']);
      } else {
        // 登录失败,跳转到登录页
        this.router.navigate(['user/login']);
      }
    });
  }

}
