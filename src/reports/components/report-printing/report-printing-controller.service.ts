import { Injectable } from "@angular/core";
import { ReportFilter } from "../../models/report-filter.model";
import { Filter } from "../../models/filter.model";
import { CustomReport } from "../../models/custom-report.model";
import { FrameworkService } from "projects/design-lib/src/lib/services/framework.service";
import { CustomReportCrudApiService } from "../../services/custom-report-crud-api.service";

@Injectable({
  providedIn: "root",
})
export class ReportPrintingControllerService {
  constructor(
    private framework: FrameworkService,
    private service: CustomReportCrudApiService
  ) {}

  customReport: CustomReport;

  filterSelected: ReportFilter;
  report: any;
  hasData: boolean = false;

  goToFilters() {
    this.framework.router.navigate([
      "reports",
      this.customReport.id,
      "print",
      "filters",
    ]);
  }

  goToReport() {
    this.framework.location.back();
  }

  clearReport() {
    this.report = null;
    this.hasData = false;
  }

  loadReport(id: string) {
    if (id != null) {
      this.service.findById(id).subscribe((x: any) => {
        this.customReport = x;
      });
    }
  }

  emit() {
    this.service
      .printReport(this.customReport.id, this.customReport.view.filters)
      .subscribe((x) => {
        this.report = x;
        this.hasData =
          x.sessions.length > 0 && x.sessions.some((x) => x.data.length > 0);
        this.goToReport();
      });
  }

  setFilterSelected(filter: ReportFilter) {
    this.filterSelected = filter;
  }

  getSearchId(filter: Filter): string {
    return filter?.externalSearchId ?? "";
  }

  getApiName(filter: Filter): string {
    return filter?.externalSearchApiName ?? "";
  }

  getSearchDescriptionField(filter: Filter): string {
    return filter?.externalSearchDescriptionField ?? "";
  }

  getSearchReturnField(filter: Filter): string {
    return filter?.externalSearchReturnField ?? "";
  }
}
