import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import * as echarts from 'echarts';
import * as $ from 'jquery';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, AfterViewInit {
  /*

ViewChild获取dom节点
    1、模板中给dom起一个名字
      <div #myBox>
        我是一个dom节点
      </div>
    2、在业务逻辑里面引入ViewChild
    import { Component, OnInit,ViewChild} from '@angular/core';
    3、 写在类里面    @ViewChild('myBox') myBox:any;
    4、ngAfterViewInit生命周期函数里面获取dom
    this.myBox.nativeElement
*/
  @ViewChild('map', null) map: any;
  myChart: any;
  provincesDownLoadPath = [
    {provinceName: '中国', pinyin: 'zhongguo', childNum: '0'},
    {provinceName: '北京市', pinyin: 'beijing', childNum: '11'},
    {provinceName: '天津市', pinyin: 'tianjin', childNum: '12'},
    {provinceName: '河北省', pinyin: 'hebei', childNum: '13'},
    {provinceName: '山西省', pinyin: 'shanxi', childNum: '14'},
    {provinceName: '内蒙古自治区', pinyin: 'neimenggu', childNum: '15'},
    {provinceName: '辽宁省', pinyin: 'liaoning', childNum: '21'},
    {provinceName: '吉林省', pinyin: 'jilin', childNum: '22'},
    {provinceName: '黑龙江省', pinyin: 'heilongjiang', childNum: '23'},
    {provinceName: '上海市', pinyin: 'shanghai', childNum: '31'},
    {provinceName: '江苏省', pinyin: 'jiangsu', childNum: '32'},
    {provinceName: '浙江省', pinyin: 'zhejiang', childNum: '33'},
    {provinceName: '安徽省', pinyin: 'anhui', childNum: '34'},
    {provinceName: '福建省', pinyin: 'fujian', childNum: '35'},
    {provinceName: '江西省', pinyin: 'jiangxi', childNum: '36'},
    {provinceName: '山东省', pinyin: 'shangdong', childNum: '37'},
    {provinceName: '河南省', pinyin: 'henan', childNum: '41'},
    {provinceName: '湖北省', pinyin: 'hubei', childNum: '42'},
    {provinceName: '湖南省', pinyin: 'hunan', childNum: '43'},
    {provinceName: '广东省', pinyin: 'guangdong', childNum: '44'},
    {provinceName: '广西壮族自治区', pinyin: 'guangxi', childNum: '45'},
    {provinceName: '海南省', pinyin: 'hainan', childNum: '46'},
    {provinceName: '重庆市', pinyin: 'chongqing', childNum: '50'},
    {provinceName: '四川省', pinyin: 'sichuan', childNum: '51'},
    {provinceName: '贵州省', pinyin: 'guizhou', childNum: '52'},
    {provinceName: '云南省', pinyin: 'yunnan', childNum: '53'},
    {provinceName: '西藏自治区', pinyin: 'xizang', childNum: '54'},
    {provinceName: '陕西省', pinyin: 'shanxi', childNum: '61'},
    {provinceName: '甘肃省', pinyin: 'gansu', childNum: '62'},
    {provinceName: '青海省', pinyin: 'qinghai', childNum: '63'},
    {provinceName: '宁夏回族自治区', pinyin: 'ningxia', childNum: '64'},
    {provinceName: '新疆维吾尔自治区', pinyin: 'xingjiang', childNum: '65'}
  ];
  t = {沈阳市: 125,
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
constructor() { }
  // angular 加载完成
  // 每次页面刷新都会调用
  ngOnInit(): void {
  }
  // dom 加载完成
  ngAfterViewInit(): void {
    // tslint:disable-next-line:variable-name
    const xzq_code = '21';
    const map: any = this.map.nativeElement;
    this.myChart = echarts.init(map);
    this.provincesDownLoadPath.forEach((p, index) => {
      if (p.childNum === xzq_code) {
        const provinceName = p.provinceName;
        const jsonName = p.pinyin;

        this.ChartData(jsonName, this.myChart, echarts, provinceName);
      }
    });
  }
  // tslint:disable-next-line:no-shadowed-variable
  private ChartData(jsonName: string, myChart, echarts, provinceName: string) {
    const geoCoordMap = [];
    const data = [];

    const uploadedDataURL = `assets/map/json/province/${jsonName}.json`;
    myChart.showLoading();
    // tslint:disable-next-line:variable-name
    const _this = this;
    // tslint:disable-next-line:only-arrow-functions
    $.getJSON(uploadedDataURL, function(geoJson) {

      echarts.registerMap(jsonName, geoJson);
      myChart.hideLoading();

      geoJson.features.forEach((feature, index) => {
        var properties = feature.properties;
        var cp = properties.cp;
        var name = properties.name;

        geoCoordMap.push({name: name, cp: cp});
        // --------注意data是外界ajax请求返回数据，如果要看效果，则将接口修改一下不传入data，下方100为假数据------
        data.push({name: name, value: _this.t[name]});
      });
      console.log(data);

      var max = 480, min = 9; // todo
      var maxSize4Pin = 100, minSize4Pin = 20;

      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[i].cp;
          // var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };
      console.log(convertData(data));
      var option = {
        title: {
          text: `${provinceName}`,
          subtext: '',
          x: 'center',
          textStyle: {
            color: '#000000'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            if (typeof(params.value)[2] === 'undefined') {
              return params.name + ' : ' + params.value;
            } else {
              return params.name + ' : ' + params.value[2];
            }
          }
        },
        // legend: {
          // orient: 'vertical',
          //           y: 'bottom',
          //           x: 'right',
          //           data: ['点'],
          //           textStyle: {
          //             color: '#5176D8'
          //           }
        // },
        visualMap: {
          show: false,
          min: 0,
          max: 500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            // color: ['#3B5077', '#031525'] // 蓝黑
            // color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            color: ['#8dccff', '#31a2ff', '#0057e2'] // 紫红
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#1488CC', '#2B32B2'] // 浅蓝
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
          }
        },
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //             dataView: {readOnly: false},
        //             restore: {},
        //             saveAsImage: {}
        //             }
        // },
        geo: {
          show: true,
          map: jsonName,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true,
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#608AFF',
              borderColor: '#FFFFFF',
            },
            emphasis: {
              areaColor: '#2B91B7',
            }
          }
        },
        series: [
          // {
          //   name: '1',
          //   type: 'scatter',
          //   coordinateSystem: 'geo',
          //   data: convertData(data),
          //   // tslint:disable-next-line:only-arrow-functions
          //   symbolSize: function(val) {
          //     return val[2] / 10;
          //   },
          //   label: {
          //     normal: {
          //       formatter: '{b}',
          //       position: 'right',
          //       show: true
          //     },
          //     // emphasis: {
          //     //   show: true
          //     // }
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: '#5176D8'
          //     }
          //   }
          // },
          {
            name: 'count_',
            type: 'map',
            map: jsonName,
            geoIndex: 0,
            aspectScale: 1.5, // 长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#2B91B7'
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            },
            animation: false,
            data: data
          },
          {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin',
            symbolSize: function(val) {
              var a = (maxSize4Pin - minSize4Pin) / (max - min);
              var b = minSize4Pin - a * min;
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
                color: '#0057e2', // 标志气泡颜色
              }
            },
            zlevel: 6,
            data: convertData(data),
          },
          // {
          //   name: 'count',
          //   type: 'effectScatter',
          //   coordinateSystem: 'geo',
          //   data: convertData(data.sort(function (a, b) {
          //     return b.value - a.value;
          //   }).slice(0, 14)),
          //   symbolSize: function (val) {
          //     return val[2] / 10;
          //   },
          //   showEffectOn: 'render',
          //   rippleEffect: {
          //     brushType: 'stroke'
          //   },
          //   hoverAnimation: true,
          //   label: {
          //     normal: {
          //       formatter: '{b}',
          //       position: 'right',
          //       show: true
          //     }
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: '#F0E68C',
          //       shadowBlur: 10,
          //       shadowColor: '#FFA500'
          //     }
          //   },
          //   zlevel: 1
          // },
        ]
      };
      myChart.setOption(option);
    });
  }

}
