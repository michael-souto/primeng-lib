import { GenericEntity } from 'projects/design-lib/src/lib/models/generic-entity.model';
import { Field } from './field.model';
import { TableView } from './table-view.model';

export class SessionField extends GenericEntity {
  field: Field;
  tableView?: TableView;
  columnNumber: number;
  customHeader?: string;
  applyOrdering?: boolean;
  orderingPriority?: number;
  orderingType?: string; // "ASC" or "DESC"
  multipleRecordsInSameRow?: boolean;
  separationCharacter?: string;
}
