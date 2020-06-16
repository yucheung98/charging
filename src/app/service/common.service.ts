import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVERADDRESS} from '../setting';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  // 用户登录
  userLogin(user: any): Observable<any> {
    const loginUrl = SERVERADDRESS + '/login';
    return this.http.post<any>(loginUrl, user, { withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'})})
      .pipe();
  }
  // 返回城市级的公司列表
  companyList(level: any): Observable<any> {
    const companyListUrl = SERVERADDRESS + '/api/company/list';
    return this.http.post(companyListUrl, level, {withCredentials: true, headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
  // 返回某公司用电信息
  companyLevel_usage(company: any): Observable<any> {
    // tslint:disable-next-line:variable-name
    const companyLevel_usageUrl = SERVERADDRESS + '/api/data/level_usage';
    // tslint:disable-next-line:max-line-length
    return this.http.post(companyLevel_usageUrl, company, {withCredentials: true, headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
  // 返回日期列表
  datetimeList(): Observable<any> {
    const datetimeListUrl = SERVERADDRESS + '/api/data/date';
    return this.http.post(datetimeListUrl, {withCredentials: true});
  }
  // 返回某日期用电信息
  city_usage(date: any): Observable<any> {
    // tslint:disable-next-line:variable-name
    const city_usageUrl = SERVERADDRESS + '/api/data/city_usage';
    // tslint:disable-next-line:max-line-length
    return this.http.post(city_usageUrl, date, {withCredentials: true, headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
  // 返回某供电公司充电站list（静态信息）
  station_list(param: any): Observable<any> {
    // tslint:disable-next-line:variable-name
    const station_listUrl = SERVERADDRESS + '/api/station/list';
    // tslint:disable-next-line:max-line-length
    return this.http.post(station_listUrl, param, {withCredentials: true, headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
  // 返回某供电公司充电站用电信息
  station(param: any): Observable<any> {
    // tslint:disable-next-line:variable-name
    const stationUrl = SERVERADDRESS + '/api/data/station';
    // tslint:disable-next-line:max-line-length
    return this.http.post(stationUrl, param, {withCredentials: true, headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
  // 返回各供电公司充电站数量
  station_count(param: any): Observable<any> {
    // tslint:disable-next-line:variable-name
    const station_countUrl = SERVERADDRESS + '/api/station/count';
    // tslint:disable-next-line:max-line-length
    return this.http.post(station_countUrl, param, {withCredentials: true, headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
}
