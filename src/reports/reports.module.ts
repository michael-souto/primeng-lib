import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportPrintingComponent } from './components/report-printing/report-printing.component';
import { ReportRegisterComponent } from './components/report-register/report-register.component';
import { ReportListingComponent } from './components/report-listing/report-listing.component';
import { DesignLibModule } from 'projects/design-lib/src/lib/design-lib.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { PrimengLibV17Module } from './../lib/primeng-lib-v17.module';
import { SessionReportRegisterComponent } from './components/report-register/session-report-register/session-report-register.component';
import { TranslateModule } from '@ngx-translate/core';
import { ChartBarComponent } from './components/report-printing/chart-bar/chart-bar.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartColumnComponent } from './components/report-printing/chart-column/chart-column.component';
import { ChartTreemapComponent } from './components/report-printing/chart-treemap/chart-treemap.component';
import { ChartRadialBarComponent } from './components/report-printing/chart-radial-bar/chart-radial-bar.component';
import { ReportPrintingSearchComponent } from './components/report-printing/report-printing-search/report-printing-search.component';
import { ReportPrintingFilterComponent } from './components/report-printing/report-printing-filter/report-printing-filter.component';
import { ChartLineComponent } from './components/report-printing/chart-line/chart-line.component';
import { IndicatorCardComponent } from './components/report-printing/indicator-card/indicator-card.component';

@NgModule({
  declarations: [
    ReportRegisterComponent,
    ReportListingComponent,
    ReportPrintingComponent,
    SessionReportRegisterComponent,
    ReportPrintingSearchComponent,
    ChartBarComponent,
    ChartColumnComponent,
    ChartRadialBarComponent,
    ChartTreemapComponent,
    ReportPrintingFilterComponent,
    ChartLineComponent,
    IndicatorCardComponent
  ],
  imports: [
    CommonModule,
    DesignLibModule,
    ReportsRoutingModule,
    PrimengLibV17Module,
    TranslateModule,

    NgApexchartsModule
  ],
  exports: [

  ]
})
export class ReportsModule { }
