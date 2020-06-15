import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../service/common.service';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.css']
})
export class UsageComponent implements OnInit {
  selectedCompany: string;
  companylist: any[] = [];
  companyUsage: any;
  selectedDatetime: string;
  datetimelist: any;
  // tslint:disable-next-line:variable-name
  option_company1: {};
  // tslint:disable-next-line:variable-name
  option_company2: {};
  listOfData: any;
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
              // color: ['#07c2d3',  '#99cc33'],
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
                // right : '15%',
                y: '20px',
                data: ['用电量(千瓦时)', '消费金额（元）']
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
                  // min: 800,
                  // max: 1500,
                  // interval: 100,
                  axisLabel: {
                    formatter: '{value}'
                  },
                  splitLine: {
                    show: false
                  }
                },
                {
                  type: 'value',
                  scale: true,
                  name: '消费金额（元）',
                  nameLocation: 'middle',
                  nameGap: 40,
                  // min: 1000,
                  // max: 2000,
                  // interval: 200,
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
                  // type: 'bar',
                  // barWidth: '50%',
                  // tslint:disable-next-line:max-line-length
                  // data: [1336.62,	1305.59,	1386.17,	1342.4,	1408.00,	976.79,	1286.37,	1325.82,	1443.85]
                  data: this.companyUsage.sum_today_usage
                },
                {
                  name: '消费金额（元）',
                  type: 'line',
                  smooth: true,
                  yAxisIndex: 1,
                  // tslint:disable-next-line:max-line-length
                  // data: [1582.74,	1554.56,	1617.79,	1595.32,	1696.59,	1154.40,	1538.47,	1624.42,	1773.63]
                  data : this.companyUsage.sum_today_amount
                },
              ]
            };

            this.option_company2 = {
              // color: ['#07c2d3',  '#99cc33'],
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
                // right : '15%',
                y: '20px',
                data: ['充电次数总和', '充电时间总和（小时）']
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
                // data: [
                //   '2020-05-22',
                //   '2020-05-24',
                //   '2020-05-25',
                //   '2020-05-26',
                //   '2020-05-27',
                //   '2020-05-28',
                //   '2020-05-29',
                //   '2020-05-30',
                //   '2020-05-31'
                // ]
              },
              yAxis: [
                {
                  type: 'value',
                  name: '充电次数总和',
                  nameLocation: 'middle',
                  nameGap: 50,
                  scale: true,
                  // min: 50,
                  // max: 200,
                  // interval: 50,
                  axisLabel: {
                    formatter: '{value}'
                  },
                  splitLine: {
                    show: false
                  }
                },
                {
                  type: 'value',
                  name: '充电时间总和（小时）',
                  nameLocation: 'middle',
                  nameGap: 40,
                  scale: true,
                  // min: 100,
                  // max: 400,
                  // interval: 100,
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
                  // type: 'bar',
                  // barWidth: '50%',
                  // tslint:disable-next-line:max-line-length
                  // data: [1336.62,	1305.59,	1386.17,	1342.4,	1408.00,	976.79,	1286.37,	1325.82,	1443.85]
                  data: this.companyUsage.sum_today_times
                },
                {
                  name: '充电时间总和（小时）',
                  type: 'line',
                  smooth: true,
                  yAxisIndex: 1,
                  // tslint:disable-next-line:max-line-length
                  // data: [1582.74,	1554.56,	1617.79,	1595.32,	1696.59,	1154.40,	1538.47,	1624.42,	1773.63]
                  data: this.companyUsage.sum_today_dur
                },
              ]
            };
          } else {
            console.log('获取数据失败！');
          }
        }
      );
  }
  // 选择日期展示用电
  onSubmitDatetime() {
    const date = {date: this.selectedDatetime};
    this.commonService.city_usage(date)
      .subscribe(
        res => {
          this.listOfData = res.data;
        }
      );
  }
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    // 搜索框
    this.commonService.datetimeList()
      .subscribe(
        res => {
          this.datetimelist = res.data;
          this.selectedDatetime = this.datetimelist[0];
          this.onSubmitDatetime();
        }
        );
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
