import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  // 登陆相关
  // loginstatus: { [key: string]: any } = {};
  // isLogged: boolean; // 是否登录
  index = 0;
  tabs = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // console.log(sessionStorage.getItem('status'));
    // console.log(sessionStorage.getItem('user_id'));
    // console.log(sessionStorage.getItem('user_role'));
    // if (sessionStorage.getItem('status')) {
    //   if (sessionStorage.getItem('status') === '1') {
    //     this.isLogged = true;
    //     // tslint:disable-next-line:radix
    //     this.loginstatus.status = parseInt(sessionStorage.getItem('status'));
    //     this.loginstatus.user_id = sessionStorage.getItem('user_id');
    //     // tslint:disable-next-line:radix
    //     this.loginstatus.user_role = parseInt(sessionStorage.getItem('user_role'));
    //   }
    // }
    console.log(window.location.href);
    const hre = window.location.href.split('/');
    console.log(hre[3]);
    if (!hre[3]) {
      this.tabs.push('充电站地图');
      this.router.navigateByUrl('/zoomin');
    }
    if (hre[3]) {
      this.tabs.push('充电站地图');
      this.router.navigateByUrl('/zoomin');
    }
  }

  newTab(tab: string): void {

    if (this.tabs.indexOf(tab) === -1) {
      this.tabs.push(tab);
      console.log(this.tabs);
      this.index = this.tabs.length - 1;

    } else {
      this.index = this.tabs.indexOf(tab);
      // this.index = 1;
    }

  }
  closeTab(tab: string): void {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }
  // 登陆相关
  // getLoginMsg(msg) {
  //   this.loginstatus = msg;
  //   this.isLogged = (msg.status === 1);
  //   sessionStorage.setItem('status', msg.status);
  //   sessionStorage.setItem('user_role', msg.user_role);
  //   sessionStorage.setItem('user_id', msg.user_id);
  // }
  // // 退出登录
  // signOut() {
  //   sessionStorage.clear();
  //   this.router.navigateByUrl('/welcome');
  //   this.isLogged = false;
  // }





}
