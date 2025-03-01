import { GenericEntity } from 'projects/design-lib/src/lib/models/generic-entity.model';
import { Filter } from './filter.model';

export class ReportFilter extends GenericEntity {
  filter: Filter;
  defaultValue?: string;
  defaultIntervalStartValue?: string;
  defaultIntervalEndValue?: string;
  assignMonthIntervalIssueDate?: boolean;
  assignWeekIntervalIssueDate?: boolean;
  assignDayIssueDate?: boolean;
}
