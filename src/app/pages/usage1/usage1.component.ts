import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../service/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-usage1',
  templateUrl: './usage1.component.html',
  styleUrls: ['./usage1.component.css']
})
export class Usage1Component implements OnInit {
  selectedCompany: string;
  companylist: any[] = [];
  companyUsage: any;
  // tslint:disable-next-line:variable-name
  option_company1: {};
  // tslint:disable-next-line:variable-name
  option_company2: {};
  // tslint:disable-next-line:variable-name
  option_company3: {};
  // tslint:disable-next-line:variable-name
  option_company4: {};
  // 提交按钮，选择公司展示数据
  onSubmitCompany(paramSearch) {
    const company = {level: 'City', company: paramSearch};
    console.log(company);
    this.commonService.companyLevel_usage(company)
      .subscribe(
        res => {
          if (res.status === 1) {
            this.companyUsage = { data_time: [], sum_today_usage: [], sum_today_amount: [], sum_today_times: [], sum_today_dur: []};
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < res.data.length; i++) {
              this.companyUsage.data_time.push(res.data[i].data_time);
              this.companyUsage.sum_today_usage.push(res.data[i].sum_today_usage);
              this.companyUsage.sum_today_amount.push(res.data[i].sum_today_amount);
              this.companyUsage.sum_today_times.push(res.data[i].sum_today_times);
              this.companyUsage.sum_today_dur.push(res.data[i].sum_today_dur);
            }
            console.log(this.companyUsage);

            this.option_company1 = {
              title: {
                // text: '辽宁省GDP发展趋势'
              },
              tooltip : {
                trigger: 'axis',
                axisPointer : {
                  type : 'shadow'
                }
              },
              legend: {
                y: '20px',
                data: ['用电量(千瓦时)']
              },
              grid: {
                left: '6%',
                right: '6%',
                bottom: '4%',
                containLabel: true
              },
              xAxis:  {
                type: 'category',
                // name: '季度',
                nameLocation: 'middle',
                nameGap: 30,
                splitLine: {
                  show: false
                },
                axisLabel: {
                  interval: 1
                },
                data: this.companyUsage.data_time
              },
              yAxis: [
                {
                  type: 'value',
                  scale: true,
                  name: '用电量(千瓦时)',
                  nameLocation: 'middle',
                  nameGap: 50,
                  axisLabel: {
                    formatter: '{value}'
                  },
                  splitLine: {
                    show: false
                  }
                },
              ],
              series: [
                {
                  name:  '用电量(千瓦时)',
                  type: 'line',
                  smooth: true,
                  data: this.companyUsage.sum_today_usage
                },
              ]
            };
            this.option_company3 = {
              title: {
                // text: '辽宁省GDP发展趋势'
              },
              tooltip : {
                trigger: 'axis',
                axisPointer : {
                  type : 'shadow'
                }
              },
              legend: {
                y: '20px',
                data: [ '消费金额（元）']
              },
              grid: {
                left: '6%',
                right: '6%',
                bottom: '4%',
                containLabel: true
              },
              xAxis:  {
                type: 'category',
                // name: '季度',
                nameLocation: 'middle',
                nameGap: 30,
                splitLine: {
                  show: false
                },
                axisLabel: {
                  interval: 1
                },
                data: this.companyUsage.data_time
              },
              yAxis: [
                {
                  type: 'value',
                  scale: true,
                  name: '消费金额（元）',
                  nameLocation: 'middle',
                  nameGap: 40,
                  axisLabel: {
                    formatter: '{value}'
                  },
                  splitLine: {
                    show: false
                  }
                },
              ],
              series: [
                {
                  name: '消费金额（元）',
                  type: 'line',
                  smooth: true,
                  data : this.companyUsage.sum_today_amount
                },
              ]
            };

            this.option_company2 = {
              title: {
                // text: '辽宁省GDP发展趋势'
              },
              tooltip : {
                trigger: 'axis',
                axisPointer : {
                  type : 'shadow'
                }
              },
              legend: {
                y: '20px',
                data: ['充电次数总和']
              },
              grid: {
                left: '6%',
                right: '6%',
                bottom: '4%',
                containLabel: true
              },
              xAxis:  {
                type: 'category',
                // name: '季度',
                nameLocation: 'middle',
                nameGap: 30,
                splitLine: {
                  show: false
                },
                axisLabel: {
                  interval: 1
                },
                data: this.companyUsage.data_time
              },
              yAxis: [
                {
                  type: 'value',
                  name: '充电次数总和',
                  nameLocation: 'middle',
                  nameGap: 40,
                  scale: true,
                  axisLabel: {
                    formatter: '{value}'
                  },
                  splitLine: {
                    show: false
                  }
                },
              ],
              series: [
                {
                  name:  '充电次数总和',
                  type: 'line',
                  smooth: true,
                  data: this.companyUsage.sum_today_times
                },
              ]
            };
            this.option_company4 = {
              title: {
                // text: '辽宁省GDP发展趋势'
              },
              tooltip : {
                trigger: 'axis',
                axisPointer : {
                  type : 'shadow'
                }
              },
              legend: {
                y: '20px',
                data: ['充电时间总和（小时）']
              },
              grid: {
                left: '6%',
                right: '6%',
                bottom: '4%',
                containLabel: true
              },
              xAxis:  {
                type: 'category',
                // name: '季度',
                nameLocation: 'middle',
                nameGap: 30,
                splitLine: {
                  show: false
                },
                axisLabel: {
                  interval: 1
                },
                data: this.companyUsage.data_time
              },
              yAxis: [
                {
                  type: 'value',
                  name: '充电时间总和（小时）',
                  nameLocation: 'middle',
                  nameGap: 40,
                  scale: true,
                  axisLabel: {
                    formatter: '{value}'
                  },
                  splitLine: {
                    show: false
                  }
                },
              ],
              series: [
                {
                  name: '充电时间总和（小时）',
                  type: 'line',
                  smooth: true,
                  data: this.companyUsage.sum_today_dur
                },
              ]
            };


          } else {
            this.message.info('获取数据失败！');
            console.log('获取数据失败！');
          }
        }
      );
  }


  constructor(private commonService: CommonService, private message: NzMessageService) { }

  ngOnInit() {
    // 搜索框
    const level = {level: 'City'};
    this.commonService.companyList(level)
      .subscribe(
        res => {
          const n = res.data.length;
          for (let i = 0; i < n; i++) {
            this.companylist.push(res.data[i]);
          }
          this.selectedCompany = this.companylist[0];
          console.log('companylist:   ' + this.companylist);
          this.onSubmitCompany(this.selectedCompany);
        }
      );




  }

}
