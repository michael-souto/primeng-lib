import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexStroke,
  ApexGrid,
  ApexMarkers,
  ApexTooltip,
} from "ng-apexcharts";
import { ItemDashboard } from "../../../models/item-dashboard.model";

export type LineChartOptions = {
  series?: ApexAxisChartSeries | any;
  chart?: ApexChart | any;
  dataLabels?: ApexDataLabels | any;
  stroke?: ApexStroke | any;
  yaxis?: ApexYAxis | any;
  xaxis?: ApexXAxis | any;
  title?: ApexTitleSubtitle | any;
  grid?: ApexGrid | any;
  markers?: ApexMarkers | any;
  tooltip?: ApexTooltip | any;
  subtitle?: ApexTitleSubtitle | any;
};

@Component({
  selector: "d-chart-line",
  templateUrl: "./chart-line.component.html",
  styleUrls: ["./chart-line.component.scss"],
})
export class ChartLineComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<LineChartOptions>;

  @Input() title: string;
  @Input() subtitle: string;
  @Input() module: string;
  @Input() detailedItem: string;

  @Input() height: string = "auto";
  @Input() labelHeight: number = 100;
  @Input() rotateLabels: boolean = false;
  @Input() showMarkers: boolean = true;
  @Input() smooth: boolean = true;
  @Input() strokeWidth: number = 3;
  @Input() data: ItemDashboard[];
  @Input() showSum: boolean = true;

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
      const seriesData = x?.map((it) => {
        if (index == 0) totalSeries0 += it.value;
        return it.value;
      });

      series.push({
        name: x["title"] || `Série ${index + 1}`,
        data: seriesData,
        type: "area",
      });
    }

    this.chartOptions = {
      series,
      chart: {
        type: "area",

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
              columnDelimiter: ",",
              headerCategory: "category",
              headerValue: "value",
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
          autoSelected: "zoom",
        },
        height: this.height,
        zoom: {
          enabled: true,
          type: "x",
          autoScaleYaxis: true,
        },
        events: {
          dataPointSelection: (event, chartContext, config) => {
            //this.detail(config.dataPointIndex);
          },
          dataPointMouseEnter: function (event) {
            if (event.path) {
              event.path[0].style.cursor = "pointer";
            }
          },
        },
      },
      dataLabels: {
        enabled: false, // Geralmente desabilitado em gráficos de linha para melhor visualização
      },
      stroke: {
        curve: this.smooth ? "smooth" : "straight",
        width: this.strokeWidth,
      },
      markers: {
        size: this.showMarkers ? 4 : 0,
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        labels: {
          rotateAlways: this.rotateLabels,
          rotate: this.rotateLabels ? -45 : 0,
          minHeight: this.rotateLabels ? this.labelHeight : undefined,
          maxHeight: this.rotateLabels ? 600 : undefined,
          hideOverlappingLabels: true,
        },
        categories: datasCharts[0]?.map((x) => x.label),
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
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
          show: true,
          formatter: function (val: any) {
            return val?.toFixed(0);
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (val: any) {
            return val + "";
          },
        },
      },
      title: {
        text:
          this.title +
          (this.showSum
            ? " - Total: " + totalSeries0
            : " - " + datasCharts[0][datasCharts[0].length - 1].value),
        align: "left",
        style: {
          fontSize: "18px",
          fontWeight: "bold",
        },
      },
      subtitle: {
        text: this.subtitle,
        align: "left",
      },
    };
  }
}
