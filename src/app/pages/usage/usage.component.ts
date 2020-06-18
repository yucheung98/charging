import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../service/common.service';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.css']
})
export class UsageComponent implements OnInit {
  isVisible = false;
  selectedDatetime: string;
  datetimelist: any;
  listOfData: any;
  dataSetList = [];
  listOfData1: any;
  dataSetList1 = [];
  pageIndex = 1;
  pageSize = 10;
  searchData(): void {
    this.dataSetList = this.listOfData.slice((this.pageIndex - 1) * this.pageSize, (this.pageIndex) * this.pageSize);
  }
  searchData1(): void {
    this.dataSetList1 = this.listOfData1.slice((this.pageIndex - 1) * this.pageSize, (this.pageIndex) * this.pageSize);
  }
  // 选择日期展示用电
  onSubmitDatetime() {
    const date = {date: this.selectedDatetime};
    this.commonService.city_usage(date)
      .subscribe(
        res => {
          this.listOfData = res.data;
          this.searchData();
        }
      );
  }
  // 模态框显示某日期下某公司的所有充电站的用电信息
  showModal(paramCompany): void {
    this.isVisible = true;
    console.log(paramCompany);
    console.log(this.selectedDatetime);
    const param = {station_No: '', data_time: this.selectedDatetime, company: paramCompany};
    this.commonService.station(param)
      .subscribe(
        res => {
          this.listOfData1 = res.data;
          this.searchData1();
        }
      );
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
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
  }

}
