import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ApexPlotOptions,
  ApexLegend
} from "ng-apexcharts";
import { ItemDashboard } from '../../../models/item-dashboard.model';

export type ChartOptions = {
  series?: ApexAxisChartSeries | any;
  chart?: ApexChart | any;
  dataLabels?: ApexDataLabels | any;
  title?: ApexTitleSubtitle | any;
  plotOptions?: ApexPlotOptions | any;
  legend?: ApexLegend | any;
};

@Component({
  selector: 'd-chart-treemap',
  templateUrl: './chart-treemap.component.html',
  styleUrls: ['./chart-treemap.component.scss']
})
export class ChartTreemapComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
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
    let seriesData = [];
    dataChart.forEach(d => seriesData.push({x: d.label, y: d.value}));

    this.chartOptions = {
      series: [
        {
          data: seriesData
        }
      ],

      chart: {
        height: this.height,
        type: "treemap"
      },
      title: {
        text: this.title
      }
    };
  }
}
