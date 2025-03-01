import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexXAxis,
  ApexFill,
  ApexPlotOptions,
  ApexTooltip,
} from 'ng-apexcharts';
import { ItemDashboard } from '../../../models/item-dashboard.model';
export type ChartOptions = {
  series?: ApexAxisChartSeries | any;
  chart?: ApexChart | any;
  xaxis?: ApexXAxis | any;
  stroke?: ApexStroke | any;
  dataLabels?: ApexDataLabels | any;
  plotOptions?: ApexPlotOptions | any;
  fill?: ApexFill | any;
  yaxis?: ApexYAxis | any;
  tooltip?: ApexTooltip | any;
  colors?: string[] | any;
  title?: ApexTitleSubtitle | any;
  subtitle?: ApexTitleSubtitle | any;
};

@Component({
  selector: 'd-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss'],
})
export class ChartBarComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() title: string;
  @Input() height: string = 'auto';
  @Input() data: ItemDashboard[];

  ngOnInit(): void {
    if (this.data?.length > 0) {
      this.loadChart(this.data);
    } else {
      this.loadChart([]);
    }
  }

  loadChart(dataChart: ItemDashboard[]) {
    let total = 0;
    if (dataChart.length > 0) {
      total = dataChart
        .map((x) => x.value)
        ?.reduce((acumulador, valor) => acumulador + valor);
    }

    this.chartOptions = {
      series: [
        {
          name: 'Total',
          data: dataChart?.map((x) => x.value),
        },
      ],
      chart: {
        height: this.height ?? 'auto',
        type: 'bar',
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
            customIcons: [],
          },
          export: {
            csv: {
              filename: this.title,
              columnDelimiter: ',',
              headerCategory: 'category',
              headerValue: 'value',
              dateFormatter(timestamp) {
                return new Date(timestamp).toDateString();
              },
            },
            svg: {
              filename: this.title,
            },
            png: {
              filename: this.title,
            },
          },
          autoSelected: 'zoom',
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },

      xaxis: {
        categories: dataChart?.map((x) => x.label),
      },

      title: {
        text: this.title,
        margin: 2,
        offsetY: 10,
        align: 'center',
        floating: true,
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
        },
      },
      subtitle: {
        text: 'Total: ' + total,
        align: 'left',
        margin: 2,
        offsetX: 20,
        offsetY: 10,
        floating: false,
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
        },
      },
    };
  }
}
