import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem, MenuItemType} from '../common/menu/menu.component';
import {UserService} from '../user/user.service';
import {UcenterCourseService} from './ucenter-course.service';
import {of, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  showMenu = false;
  showUserMenu = false;
  searchResult: MenuItem[];
  subject = new Subject();

  menuData: MenuItem[] = [
    {label: '设计学吧', url: 'https://www.kaikeba.com/', type: MenuItemType.Link},
    {label: '产品学吧', url: 'https://www.kaikeba.com/', type: MenuItemType.Link},
  ];

  userMenuData = [
    {label: '首页', url: 'https://www.kaikeba.com/', type: MenuItemType.Link},
    {label: '我们消息', url: 'ucenter/message', type: MenuItemType.Router},
    {
      label: '退出', cb: () => {
        // 退出注销
        this.us.logout().subscribe((sucesss) => {
          if (sucesss) { // 注销成功，去登录界面
            this.router.navigate(['/user/login']);
          } else {
            alert('注销失败，请再试一次');
          }
        });
      }, type: MenuItemType.Callback
    },
  ];

  constructor(private router: Router,
              private us: UserService,
              private ucs: UcenterCourseService) {

    this.subject.pipe(
      debounceTime(300), // 防抖
      distinctUntilChanged(), // 去重：加入紧挨着两次输入值相同则不发送
      switchMap(keyword => {
        if (keyword === '') {
          return of(null);
        } else {
          return this.ucs.searchCourse(keyword);
        }
      })
    ).subscribe((result) => {
      if (result && result.success) {
        this.searchResult = result.data.map((d) => {
          return {label: d.name, url: d.url, type: MenuItemType.Link};
        });
      } else {
        this.searchResult = null;
      }
    });
  }

  ngOnInit() {
  }

  searchCourse(keyword) {
    this.subject.next(keyword);
  }


  // gotoCourse(courseId) {
  //   this.router.navigate(['main/course', courseId,
  //     {username: 'foo', age: 23}], {
  //     queryParams: {sex: 'man'}
  //   });
  // }
}
