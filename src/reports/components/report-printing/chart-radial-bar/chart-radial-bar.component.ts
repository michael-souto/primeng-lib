import { Component, OnInit, ViewChild, Input, SimpleChanges, OnChanges, AfterViewChecked } from '@angular/core';
import {
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexTooltip,
  ChartComponent,
} from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
} from 'ng-apexcharts';
import { ItemDashboard } from '../../../models/item-dashboard.model';
export type ChartOptions = {
  series?: ApexNonAxisChartSeries | any;
  chart?: ApexChart | any;
  labels?: string[] | any;
  title?: ApexTitleSubtitle | any;
  tooltip?: ApexTooltip | any;
  dataLabels?: ApexDataLabels | any;
  fill?: ApexFill | any;
  legend?: ApexLegend | any;
  plotOptions?: ApexPlotOptions | any;
  responsive?: ApexResponsive[] | any;
};

@Component({
  selector: 'd-chart-radial-bar',
  templateUrl: './chart-radial-bar.component.html',
  styleUrls: ['./chart-radial-bar.component.scss'],
})
export class ChartRadialBarComponent implements OnInit {
  constructor(

  ) {}

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() title: string;
  @Input() module: string;
  @Input() detailedItem: string;
  @Input() height: string = 'auto';
  @Input() data: ItemDashboard[];

  total = 0;

  ngOnInit(): void {
    if (this.data?.length > 0) {
      this.loadChart(this.data);
    } else {
      this.loadChart([]);
    }
  }

  loadChart(dataChart: ItemDashboard[]) {
    this.chartOptions = {
      series: dataChart?.map((x) => {
        this.total += x.value;
        return x.value;
      }),
      chart: {
        height: this.height,
        type: 'donut',
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
      },
      labels: dataChart?.map((x) => x.label + ' (' + x.value + ')'),
      dataLabels: {
        enabled: true,
      },
      fill: {
        type: 'gradient',
      },
      tooltip: {
        enabled: true,
      },
      responsive: [
        {
          breakpoint: 575,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              show: true,
            },
            dataLabels: {
              enabled: true,
            },
          },
        },
      ],
    };
  }
}
