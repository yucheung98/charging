import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/en';
import {NgxEchartsModule} from 'ngx-echarts';
import {LoginComponent} from './login/login.component';
import {WelcomeModule} from './pages/welcome/welcome.module';
import { UsageComponent } from './pages/usage/usage.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ZoominComponent } from './pages/zoomin/zoomin.component';
import { Usage1Component } from './pages/usage1/usage1.component';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsageComponent,
    ZoominComponent,
    Usage1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    WelcomeModule,
    NgxEchartsModule,
    NzTableModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
