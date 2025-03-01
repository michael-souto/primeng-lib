import { Component, OnInit } from '@angular/core';
import { ListRegisterComponent } from 'projects/design-lib/src/lib/components/list-register/list-register.component';
import { FrameworkService } from 'projects/design-lib/src/lib/services/framework.service';
import { CustomReport } from 'projects/primeng-lib/src/reports/models/custom-report.model';
import { CustomReportCrudApiService } from 'projects/primeng-lib/src/reports/services/custom-report-crud-api.service';
import { CustomReportsControllerService } from '../../services/custom-reports-controller.service';

@Component({
  selector: 'd-report-listing',
  templateUrl: './report-listing.component.html',
  styleUrls: ['./report-listing.component.scss'],
})
export class ReportListingComponent extends ListRegisterComponent<CustomReport> {

  constructor(
    protected override service: CustomReportCrudApiService,
    protected override controller: CustomReportsControllerService,
    public override framework: FrameworkService
  ) {
    super(service, controller, framework);
  }

  override getRouterLink(): string {
    return 'reports';
  }

  print(id: string) {
    this.framework.router.navigate(['/reports', id, 'print']);
  }
}
