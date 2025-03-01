import { DataType } from './data-type.model';
import { GenericEntity } from 'projects/design-lib/src/lib/models/generic-entity.model';

export class Field extends GenericEntity {
  identifierName: string;
  columnName: string;
  type: DataType;
  keyField: boolean = false;
  groupField: boolean = false;
  groupingExpression?: string;
  totalField: boolean = false;
  totalizingExpression?: string;
  fieldHeader: Map<string, string> = new Map<string, string>([
    ['pt', ''],
    ['en', ''],
    ['es', ''],
    ['fr', ''],
    ['de', ''],
    ['it', ''],
  ]);
  hidden: boolean = false;
}
