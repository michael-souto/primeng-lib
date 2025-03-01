import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  ApexGrid,
  ApexStroke,
} from 'ng-apexcharts';
import { ItemDashboard } from '../../../models/item-dashboard.model';

export type ChartOptions = {
  series?: ApexAxisChartSeries | any;
  chart?: ApexChart | any;
  dataLabels?: ApexDataLabels | any;
  plotOptions?: ApexPlotOptions | any;
  fill?: ApexFill | any;
  stroke: ApexStroke;
  yaxis?: ApexYAxis | any;
  xaxis?: ApexXAxis | any;
  title?: ApexTitleSubtitle | any;
};
@Component({
  selector: 'd-chart-column',
  templateUrl: './chart-column.component.html',
  styleUrls: ['./chart-column.component.scss'],
})
export class ChartColumnComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() title: string;
  @Input() module: string;
  @Input() detailedItem: string;

  @Input() height: string = 'auto';
  @Input() labelHeight: number = 100;
  @Input() rotateLabels: boolean = false;
  @Input() data: ItemDashboard[];

  types = ['bar', 'line', 'area'];

  constructor() {}

  ngOnInit(): void {
    if (this.data?.length > 0) {
      this.loadChart(this.data);
    } else {
      this.loadChart([]);
    }
  }

  loadChart(...datasCharts: ItemDashboard[][]) {
    let series = [];
    let totalSeries0 = 0;
    this.data = datasCharts[0];

    for (let index = 0; index < datasCharts.length; index++) {
      const x = datasCharts[index];
      series.push({
        name: x['title'],
        data: x?.map((it) => {
          {
            if (index == 0) totalSeries0 += it.value;
            return it.value;
          }
        }),
        type: this.types[index],
      });
    }

    this.chartOptions = {
      series,
      chart: {
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
            customIcons: []
          },
          export: {
            csv: {
              filename: this.title,
              columnDelimiter: ',',
              headerCategory: 'category',
              headerValue: 'value',
              dateFormatter(timestamp) {
                return new Date(timestamp).toDateString()
              }
            },
            svg: {
              filename: this.title,
            },
            png: {
              filename: this.title,
            }
          },
          autoSelected: 'zoom'
        },

        height: this.height,
        events: {
          dataPointSelection: (event, chartContext, config) => {
            //this.detail(config.dataPointIndex);
          },
          dataPointMouseEnter: function (event) {
            if (event.path) {
              event.path[0].style.cursor = 'pointer';
            }
          },
        },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'center',
          },
        },
      },
      dataLabels: {
        enabled: true,
      },

      stroke: {
        width: 1.5,
      },

      xaxis: {
        labels: {
          rotateAlways: this.rotateLabels,
          rotate: -65,
          minHeight: this.rotateLabels ? this.labelHeight : undefined,
          maxHeight: this.rotateLabels ? 600 : undefined,
          hideOverlappingLabels: false,
        },
        categories: datasCharts[0]?.map((x) => x.label),

        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100],
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: any) {
            return val;
          },
        },
      },
      title: {
        text: this.title + ' - Total: ' + totalSeries0,
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
        },
      },
    };
  }

}
