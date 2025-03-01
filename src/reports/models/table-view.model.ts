import { GenericEntity } from 'projects/design-lib/src/lib/models/generic-entity.model';
import { DataTable } from './data-table.model';

export class TableView extends GenericEntity {
  dataTable: DataTable;
  additionalDescription: Map<string, string> = new Map<string, string>([
    ['pt', ''],
    ['en', ''],
    ['es', ''],
    ['fr', ''],
    ['de', ''],
    ['it', ''],
  ]);
  alias?: string;
  priorityOrder?: number;
  conditions?: string;
  relationType?: string;
}
