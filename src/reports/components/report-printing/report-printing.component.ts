
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FrameworkService } from 'projects/design-lib/src/lib/services/framework.service';
import { CustomReport } from 'projects/primeng-lib/src/reports/models/custom-report.model';
import { CustomReportCrudApiService } from 'projects/primeng-lib/src/reports/services/custom-report-crud-api.service';
import { ReportPrintingControllerService } from './report-printing-controller.service';
import { EventBusService } from 'projects/design-lib/src/lib/services/event-bus.service';
@Component({
  selector: 'd-report-printing',
  templateUrl: './report-printing.component.html',
  styleUrls: ['./report-printing.component.scss'],
})
export class ReportPrintingComponent  implements OnInit {

  constructor(
    protected service: CustomReportCrudApiService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected framework: FrameworkService,
    public controller: ReportPrintingControllerService,
    private eventBusService: EventBusService
  ) {}

  report: any;

  ngOnInit(): void {
    const id: string = this.activatedRoute.snapshot.params['id'];
    const load: boolean = this.activatedRoute.snapshot.queryParams['load'] === 'true';
    if (id != null && load) {
      this.service.findById(id).subscribe((x: any) => {
        this.controller.customReport = x;
      });
      this.eventBusService.emit({ type: 'report:printing' });
    } else {
    }
  }

  emit() {
    this.service
      .printReport(
        this.controller.customReport.id,
        this.controller.customReport.filters
      )
      .subscribe((x) => {
        this.report = x;
      });
  }
  getItemDashboardBySession(dataSession: []): any[] {
    return dataSession.map((x) => {
      const property = Object.keys(x);
      const propertyValue = property.filter(x=> x.indexOf('_total') > 0)[0];
      const propertyLabel = property.filter(x=> x.indexOf('_total') < 0)[0];
      return {
        label: x[propertyLabel] ?? 'N/ Informado(a)',
        value: x[propertyValue] ?? 0,
      };
    });
  }
  getNumberCols(session: any): string {
    let displaySize = Math.round((session.displaySize * 12) / 100);
    displaySize = Math.max(1, Math.min(displaySize, 12));
    return `col-12 md:col-${displaySize}`;
  }
  goList(){
    this.framework.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }
}
