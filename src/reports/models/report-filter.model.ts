import { GenericEntity } from 'projects/design-lib/src/lib/models/generic-entity.model';
import { Filter } from './filter.model';

export class ReportFilter extends GenericEntity {
  filter: Filter;
  multipleValues?: boolean;
  ordering?: number;
  defaultValue?: string;
  defaultIntervalStartValue?: string;
  defaultIntervalEndValue?: string;
  assignMonthIntervalIssueDate?: boolean;
  assignWeekIntervalIssueDate?: boolean;
  assignDayIssueDate?: boolean;

  getSearchId(): string {
    return this.filter?.externalSearchId;
  }

  getApiName(): string {
    return this.filter?.externalSearchApiName;
  }

  getSearchReturnField(): string {
    return this.filter?.externalSearchReturnField;
  }

  getSearchDescriptionField(): string {
    return this.filter?.externalSearchDescriptionField;
  }
}
