import { Injectable } from '@angular/core';
import { ReportFilter } from '../../models/report-filter.model';
import { Filter } from '../../models/filter.model';
import { CustomReport } from '../../models/custom-report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportPrintingControllerService {

  constructor() { }

  customReport: CustomReport;

  filterSelected: ReportFilter;

  setFilterSelected(filter: ReportFilter) {
    this.filterSelected = filter;
  }

  getSearchId(filter: Filter): string {
    return filter?.externalSearchId ?? '';
  }

  getApiName(filter: Filter): string {
    return filter?.externalSearchApiName ?? '';
  }

  getSearchDescriptionField(filter: Filter): string {
    return filter?.externalSearchDescriptionField ?? '';
  }

  getSearchReturnField(filter: Filter): string {
    return filter?.externalSearchReturnField ?? '';
  }

}
