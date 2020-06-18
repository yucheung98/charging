import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as echarts from 'echarts';
import * as $ from 'jquery';
import {CommonService} from '../../service/common.service';
@Component({
  selector: 'app-zoomin',
  templateUrl: './zoomin.component.html',
  styleUrls: ['./zoomin.component.css']
})
export class ZoominComponent implements OnInit, AfterViewInit {
  @ViewChild('map', null) map: any;
  isVisible = false;
  option_usage: {};
  option_amount: {};
  option_times: {};
  option_dur: {};
  showModal(): void {
    this.isVisible = true;
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
  }
  ngAfterViewInit(): void {
    const _this = this;
    const count = {沈阳市: 125,
      大连市: 235,
      鞍山市: 12,
      抚顺市: 23,
      本溪市: 8,
      丹东市: 7,
      锦州市: 15,
      营口市: 11,
      阜新市: 12,
      辽阳市: 11,
      盘锦市: 15,
      铁岭市: 88,
      朝阳市: 18,
      葫芦岛市: 45};
    const citylist = ['沈阳市',
      '大连市',
      '鞍山市',
      '抚顺市',
      '本溪市',
      '丹东市',
      '锦州市',
      '营口市',
      '阜新市',
      '辽阳市',
      '盘锦市',
      '铁岭市',
      '朝阳市',
      '葫芦岛市'];
    const geoCoordMap = [];
    const data = [];
    let staticinfo = [];
    let usageinfo = { data_time: [], today_usage: [], today_amount: [], today_times: [], today_dur: []};
    const map: any = this.map.nativeElement;
    const liaoning = 'assets/map/json/province/liaoning.json';
    const shenyang = 'assets/map//liaoning/沈阳市.json';
    const tieling = 'assets/map//liaoning/铁岭市.json';
    const fushun = 'assets/map//liaoning/抚顺市.json';
    const fuxin = 'assets/map//liaoning/阜新市.json';
    const chaoyang = 'assets/map//liaoning/朝阳市.json';
    const huludao = 'assets/map//liaoning/葫芦岛市.json';
    const jinzhou = 'assets/map//liaoning/锦州市.json';
    const panjin = 'assets/map//liaoning/盘锦市.json';
    const anshan = 'assets/map//liaoning/鞍山市.json';
    const liaoyang = 'assets/map//liaoning/辽阳市.json';
    const benxi = 'assets/map//liaoning/本溪市.json';
    const yingkou = 'assets/map//liaoning/营口市.json';
    const dandong = 'assets/map//liaoning/丹东市.json';
    const dalian = 'assets/map//liaoning/大连市.json';
    // tslint:disable-next-line:no-shadowed-variable
    const convertData = function(data) {
      const res = [];
      for (let i = 0; i < data.length; i++) {
        const geoCoord = geoCoordMap[i].cp;
        // var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      console.log(res);
      return res;
    };

    echarts.extendsMap = function(id, opt) {
      // 实例
      const chart = echarts.init(map);

      let curGeoJson = {};
      const cityMap = {
        沈阳市: shenyang,
        铁岭市: tieling,
        抚顺市: fushun,
        阜新市: fuxin,
        朝阳市: chaoyang,
        葫芦岛市: huludao,
        锦州市: jinzhou,
        盘锦市: panjin,
        鞍山市: anshan,
        辽阳市: liaoyang,
        本溪市: benxi,
        营口市: yingkou,
        丹东市: dandong,
        大连市: dalian
      };

      const levelColorMap = {
        1: 'rgba(241, 109, 115, .8)',
        2: 'rgba(255, 235, 59, .7)',
        3: 'rgba(147, 235, 248, 1)'
      };

      const defaultOpt = {
        mapName: 'china',     // 地图展示
        goDown: false,        // 是否下钻
        bgColor: '#404a59',   // 画布背景色
        activeArea: [],       // 区域高亮,同echarts配置项
        data: [],
        // 下钻回调(点击的地图名、实例对象option、实例对象)
        callback(name, option, instance) {}
      };
      if (opt) { opt = this.util.extend(defaultOpt, opt); }

      // 层级索引
      const name = [opt.mapName];
      let idx = 0;
      const pos = {
        leftPlus: 115,
        leftCur: 150,
        left: 198,
        top: 50
      };

      const line = [[0, 0], [8, 11], [0, 22]];
      // style
      const style = {
        font: '18px "Microsoft YaHei", sans-serif',
        textColor: '#eee',
        lineColor: 'rgba(147, 235, 248, .8)'
      };
      const max = 480, min = 9; // todo
      const maxSize4Pin = 100, minSize4Pin = 40;

      const handleEvents = {
        /**
         * i 实例对象
         * o option
         * n 地图名
         **/
        resetOption(i, o, n) {
          console.log(i);
          console.log(o);
          console.log(n);
          const breadcrumb = this.createBreadcrumb(n);

          const j = name.indexOf(n);
          const l = o.graphic.length;
          if (j < 0) {
            o.graphic.push(breadcrumb);
            o.graphic[0].children[0].shape.x2 = 145;
            o.graphic[0].children[1].shape.x2 = 145;
            // if (o.graphic.length > 2) {
            //   for (let x = 0; x < opt.data.length; x++) {
            //     if (n === opt.data[x].name + '市') {
            //       o.series[0].data = handleEvents.initSeriesData([opt.data[x]]);
            //       break;
            //     } else { o.series[0].data = []; }
            //   }
            // }
            name.push(n);
            idx++;
          } else {
            o.graphic.splice(j + 2, l);
            if (o.graphic.length <= 2) {
              o.graphic[0].children[0].shape.x2 = 60;
              o.graphic[0].children[1].shape.x2 = 60;
              // o.series[0].data = handleEvents.initSeriesData(opt.data);
            }
            name.splice(j + 1, l);
            idx = j;
            pos.leftCur -= pos.leftPlus * (l - j - 1);
          }
          if (n === '辽宁') {
            o.tooltip = {
              trigger: 'item',
              formatter(params) {
                if (typeof (params.value)[2] === 'undefined') {
                  return '充电站数量' + ' : ' + params.value;
                } else {
                  return '充电站数量' + ' : ' + params.value[2];
                }
              }
            };
            o.series[0] = {
              name: '点',
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: 'pin',
              symbolSize(val) {
                const a = (maxSize4Pin - minSize4Pin) / (max - min);
                let b = minSize4Pin - a * min;
                b = maxSize4Pin - a * max;
                return a * val[2] + b;
              },
              label: {
                normal: {
                  formatter: '{@[2]}',
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize: 9,
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#FF86A6', // 标志气泡颜色
                }
              },
              zlevel: 6,
              data: convertData(data),
            };
            o.geo.map = n;
            o.geo.zoom = 0.4;
            i.clear();
            i.setOption(o);
            this.zoomAnimation();
            opt.callback(n, o, i);
          } else {
            o.series.splice(0, 1);
            const n_1 = n;
            const n_2 = n.split('');
            n_2.splice(-1, 1);
            let param = {level: 'City', company: '国网' + n_2[0] + n_2[1] + '供电公司'};
            if (n === '葫芦岛市') {
              param = {level: 'City', company: '国网' + n_2[0] + n_2[1] + n_2[2] + '供电公司'};
            }
            console.log(param);
            _this.commonService.station_list(param)
              .subscribe(
                res => {
                  staticinfo = [];
                  console.log(res.data);
                  for (let i = 0; i < res.data.length; i++) {
                    const info = {name: '', value: []};
                    info.name = res.data[i].name;
                    info.value.push(res.data[i].lng);
                    info.value.push(res.data[i].lat);
                    info.value.push(res.data[i].station_No);
                    info.value.push(res.data[i].address);
                    info.value.push(res.data[i].stakeTotalCount);
                    staticinfo.push(info);
                  }
                  console.log(staticinfo);
                },
                err => console.log(err),
                () => {
                  o.tooltip = {
                    trigger: 'item',
                    formatter(params) {
                      let s = '';
                      s += '充电站名称: ' + params.name + '<br>';
                      s += '充电站编码: ' + params.value[2] + '<br>';
                      s += '充电站地址: ' + params.value[3] + '<br>';
                      s += '充电桩数量: ' + params.value[4] + '<br>';
                      // s += '日期: ' + params.value[5] + '<br>';
                      // s += '用电量（千瓦时）: ' + params.value[6].toFixed(3) + '<br>';
                      // s += '消费金额（元）: ' + params.value[7] + '<br>';
                      // s += '充电次数: ' + params.value[8] + '<br>';
                      // s += '充电时间（小时） ' + params.value[9].toFixed(3) + '<br>';
                      return s;
                    }
                  };
                  o.series[0] = {
                    name: '点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbol: 'pin',
                    roam: true, // 是否开启平游或缩放
                    symbolSize(val) {
                      const a = (maxSize4Pin - minSize4Pin) / (max - min);
                      let b = minSize4Pin - a * min;
                      b = maxSize4Pin - a * max;
                      return a * val[4] + b;
                    },
                    label: {
                      normal: {
                        formatter: '{@[4]}',
                        show: false,
                        textStyle: {
                          color: '#fff',
                          fontSize: 9,
                        }
                      }
                    },
                    itemStyle: {
                      normal: {
                        color: '#FF86A6', // 标志气泡颜色
                      }
                    },
                    zlevel: 6,
                    data: staticinfo,
                  };
                  o.geo.map = n;
                  o.geo.zoom = 0.4;
                  i.clear();
                  i.setOption(o);
                  i.on('click', function(params) {
                    console.log(params.name);
                    if (!citylist.includes(params.name)) {
                      let param2 = {station_No: params.value[2], data_time: '', company: ''};
                      console.log(param2);
                      _this.commonService.station(param2)
                        .subscribe(
                          res => {
                            console.log(res.data);
                            usageinfo = { data_time: [], today_usage: [], today_amount: [], today_times: [], today_dur: []};
                            for (let i = 0; i < res.data.length; i++) {
                              usageinfo.data_time.push(res.data[i].data_time);
                              usageinfo.today_usage.push(res.data[i].today_usage);
                              usageinfo.today_amount.push(res.data[i].today_amount);
                              usageinfo.today_times.push(res.data[i].today_times);
                              usageinfo.today_dur.push(res.data[i].today_dur);
                            }
                            console.log(usageinfo);
                            _this.option_usage = {
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
                                data: usageinfo.data_time
                              },
                              yAxis: [
                                {
                                  type: 'value',
                                  scale: true,
                                  name: '用电量(千瓦时)',
                                  nameLocation: 'middle',
                                  nameGap: 30,
                                  // min: 800,
                                  // max: 1500,
                                  // interval: 100,
                                  axisLabel: {
                                    formatter: '{value}'
                                  },
                                  splitLine: {
                                    show: false
                                  }
                                }
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
                                  data: usageinfo.today_usage
                                }
                              ]
                            };
                            _this.option_amount = {
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
                                data: ['消费金额（元）']
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
                                data: usageinfo.data_time
                              },
                              yAxis: [
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
                                  name: '消费金额（元）',
                                  type: 'line',
                                  smooth: true,
                                  // tslint:disable-next-line:max-line-length
                                  // data: [1582.74,	1554.56,	1617.79,	1595.32,	1696.59,	1154.40,	1538.47,	1624.42,	1773.63]
                                  data : usageinfo.today_amount
                                },
                              ]
                            };
                            _this.option_times = {
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
                                data: usageinfo.data_time
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
                                }
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
                                  data: usageinfo.today_times
                                }
                              ]
                            };
                            _this.option_dur = {
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
                                data: usageinfo.data_time
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
                                  name: '充电时间总和（小时）',
                                  type: 'line',
                                  smooth: true,
                                  // tslint:disable-next-line:max-line-length
                                  // data: [1582.74,	1554.56,	1617.79,	1595.32,	1696.59,	1154.40,	1538.47,	1624.42,	1773.63]
                                  data: usageinfo.today_dur
                                },
                              ]
                            };
                            _this.isVisible = true;
                          }
                        );
                    }
                  });
                  this.zoomAnimation();
                  // opt.callback(n, o, i);
                });
          }
        },
        /**
         * name 地图名
         **/
          createBreadcrumb(name) {
          const cityToPinyin = {
            沈阳市: 'shenyang',
            铁岭市: 'tieling',
            抚顺市: 'fushun',
            阜新市: 'fuxin',
            朝阳市: 'chaoyang',
            葫芦岛市: 'huludao',
            锦州市: 'jinzhou',
            盘锦市: 'panjin',
            鞍山市: 'anshan',
            辽阳市: 'liaoyang',
            本溪市: 'benxi',
            营口市: 'yingkou',
            丹东市: 'dandong',
            大连市: 'dalian'
          };
          const breadcrumb = {
            type: 'group',
            id: name,
            left: pos.leftCur + pos.leftPlus,
            top: pos.top + 3,
            children: [{
              type: 'polyline',
              left: -90,
              top: -5,
              shape: {
                points: line
              },
              style: {
                stroke: '#fff',
                key: name
                // lineWidth: 2,
              },
              onclick() {
                const name = this.style.key;
                handleEvents.resetOption(chart, option, name);
              }
            }, {
              type: 'text',
              left: -68,
              top: 'middle',
              style: {
                text: name,
                textAlign: 'center',
                fill: style.textColor,
                font: style.font
              },
              onclick() {
                const name = this.style.text;
                handleEvents.resetOption(chart, option, name);
              }
            }, {
              type: 'text',
              left: -68,
              top: 10,
              style: {

                name,
                text: cityToPinyin[name] ? cityToPinyin[name].toUpperCase() : '',
                textAlign: 'center',
                fill: style.textColor,
                font: '12px "Microsoft YaHei", sans-serif',
              },
              onclick() {
                // console.log(this.style);
                const name = this.style.name;
                handleEvents.resetOption(chart, option, name);
              }
            }]
          };

          pos.leftCur += pos.leftPlus;

          return breadcrumb;
        },

        // 设置effectscatter
        // tslint:disable-next-line:no-shadowed-variable
        initSeriesData(data) {
          const temp = [];
          for (let i = 0; i < data.length; i++) {
            const geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              temp.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value, data[i].level)
              });
            }
          }
          console.log(temp);
          return temp;
        },

        zoomAnimation() {
          let count = null;
          const zoom = function(per) {
            if (!count) { count = per; }
            count = count + per;
            // console.log(per,count);
            chart.setOption({
              geo: {
                zoom: count
              }
            });
            if (count < 1) { window.requestAnimationFrame(function() {
              zoom(0.2);
            });
            }
          };
          window.requestAnimationFrame(function() {
            zoom(0.2);
          });
        }
      };

      const option = {
        backgroundColor: opt.bgColor,
        tooltip: {
          trigger: 'item',
          formatter(params) {
            if (typeof(params.value)[2] === 'undefined') {
              return '充电站数量' + ' : ' + params.value;
            } else {
              return '充电站数量' + ' : ' + params.value[2];
            }
          }
        },
        graphic: [
          {
          type: 'group',
          left: pos.left,
          top: pos.top - 4,
          children: [{
            type: 'line',
            left: 0,
            top: -20,
            shape: {
              x1: 0,
              y1: 0,
              x2: 60,
              y2: 0
            },
            style: {
              stroke: style.lineColor,
            }
          }, {
            type: 'line',
            left: 0,
            top: 20,
            shape: {
              x1: 0,
              y1: 0,
              x2: 60,
              y2: 0
            },
            style: {
              stroke: style.lineColor,
            }
          }]
        }, {
          id: name[idx],
          type: 'group',
          left: pos.left + 2,
          top: pos.top,
          children: [{
            type: 'polyline',
            left: 90,
            top: -12,
            shape: {
              points: line
            },
            style: {
              stroke: 'transparent',
              key: name[0]
            },
            onclick() {
              const name = this.style.key;
              handleEvents.resetOption(chart, option, name);
            }
          }, {
            type: 'text',
            left: 0,
            top: 'middle',
            style: {
              text: name[0] === '辽宁' ? '辽宁省' : name[0],
              textAlign: 'center',
              fill: style.textColor,
              font: style.font
            },
            onclick() {
              handleEvents.resetOption(chart, option, '辽宁');
            }
          }, {
            type: 'text',
            left: 0,
            top: 10,
            style: {
              text: 'LIAONING',
              textAlign: 'center',
              fill: style.textColor,
              font: '12px "Microsoft YaHei", sans-serif',
            },
            onclick() {
              handleEvents.resetOption(chart, option, '辽宁');
            }
          }]
        }
        ],
        geo: {
          map: opt.mapName,
          roam: true,
          zoom: 1,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(147, 235, 248, 1)',
              borderWidth: 1,
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(128, 217, 248, 1)',
              // shadowColor: 'rgba(255, 255, 255, 1)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10
            },
            emphasis: {
              areaColor: '#389BB7',
              borderWidth: 0
            }
          },
          regions: opt.activeArea.map(function(item) {
            if (typeof item !== 'string') {
              return {
                name: item.name,
                itemStyle: {
                  normal: {
                    areaColor: item.areaColor || '#389BB7'
                  }
                },
                label: {
                  normal: {
                    show: item.showLabel,
                    textStyle: {
                      color: '#fff'
                    }
                  }
                }
              };
            } else {
              return {
                name: item,
                itemStyle: {
                  normal: {
                    borderColor: '#91e6ff',
                    areaColor: '#389BB7'
                  }
                }
              };
            }
          })
        },
        series: [
          {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin',
            symbolSize(val) {
              const a = (maxSize4Pin - minSize4Pin) / (max - min);
              let b = minSize4Pin - a * min;
              b = maxSize4Pin - a * max;
              return a * val[2] + b;
            },
            label: {
              normal: {
                formatter: '{@[2]}',
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 9,
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#FF86A6', // 标志气泡颜色
              }
            },
            zlevel: 6,
            data: convertData(data),
          }
          ]
      };

      chart.setOption(option);
      // 添加事件
      chart.on('click', function(params) {
        const _self = this;
        if (opt.goDown && params.name !== name[idx]) {
          if (cityMap[params.name]) {
            const url = cityMap[params.name];
            $.get(url, function(response) {
              // console.log(response);
              curGeoJson = response;
              echarts.registerMap(params.name, response);
              handleEvents.resetOption(_self, option, params.name);
            });
          }
        }
      });

      chart.setMap = function(mapName) {
        const _self = this;
        if (mapName.indexOf('市') < 0) { mapName = mapName + '市'; }
        const citySource = cityMap[mapName];
        if (citySource) {
          // var url = './map/' + citySource + '.json';
          $.get(citySource, function(response) {
            // console.log(response);
            curGeoJson = response;
            echarts.registerMap(mapName, response);
            handleEvents.resetOption(_self, option, mapName);
          });
        }
        // handleEvents.resetOption(this, option, mapName);
      };

      return chart;
    };

    $.getJSON(liaoning, function(geoJson) {
      echarts.registerMap('辽宁', geoJson);
      geoJson.features.forEach((feature, index) => {
        const properties = feature.properties;
        const cp = properties.cp;
        const name = properties.name;

        geoCoordMap.push({name, cp});
        // --------注意data是外界ajax请求返回数据，如果要看效果，则将接口修改一下不传入data，下方100为假数据------
        data.push({name, value: count[name]});
      });
      console.log(data);
      const myChart = echarts.extendsMap('chart-panel', {
        bgColor: '#154e90', // 画布背景色
        mapName: '辽宁',    // 地图名
        goDown: true,       // 是否下钻
        data: [],
        // 下钻回调
        callback(name, option, instance) {
          console.log(name, option, instance);
        }
      });
    });
  }
}
