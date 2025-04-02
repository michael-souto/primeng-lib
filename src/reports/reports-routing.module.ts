import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportRegisterComponent } from './components/report-register/report-register.component';
import { ReportListingComponent } from './components/report-listing/report-listing.component';
import { ReportPrintingComponent } from './components/report-printing/report-printing.component';
import { SessionReportRegisterComponent } from './components/report-register/session-report-register/session-report-register.component';
import { ReportPrintingSearchComponent } from './components/report-printing/report-printing-search/report-printing-search.component';

const routes: Routes = [
  {
    path: '',
    component: ReportListingComponent
  },
  {
    path: 'create',
    data: { breadcrumb: 'Novo relatório' },
    component: ReportRegisterComponent
  },
  {
    path: 'create/sessions',
    data: { breadcrumb: 'Sessões' },
    component: SessionReportRegisterComponent
  },
  {
    path: ':id',
    data: { breadcrumb: 'Relatório' },
    component: ReportRegisterComponent
  },
  {
    path: ':id/sessions',
    data: { breadcrumb: 'Sessões' },
    component: SessionReportRegisterComponent
  },
  {
    path: ':id/print',
    data: { breadcrumb: 'Imprimir' },
    component: ReportPrintingComponent
  },
  {
    path: ':id/print/:searchId',
    data: { breadcrumb: 'Buscar' },
    component: ReportPrintingSearchComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
