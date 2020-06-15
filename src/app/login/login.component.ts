import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CommonService} from '../service/common.service';
import {NzMessageService} from 'ng-zorro-antd';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  user: { [key: string]: any } = {};
  @Output() loginMsg = new EventEmitter<any>();

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.user.user_id = this.validateForm.value.userName;
    this.user.pwd = this.validateForm.value.password;


    this.commonService.userLogin(this.user)
      .subscribe((loginstatus) => {
        console.log(loginstatus);
        if ( loginstatus.status === 0) {
          console.log(loginstatus.status);
          this.message.create('error', '用户名或密码错误！');
        }
        this.sendLoginMsg(loginstatus);
      });
  }
  // 发送消息至父表单
  sendLoginMsg(loginMsg) {
    this.loginMsg.emit(loginMsg);
  }

  constructor(private fb: FormBuilder, private commonService: CommonService, private cookieService: CookieService,
              private message: NzMessageService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
