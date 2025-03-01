import { GenericEntity } from 'projects/design-lib/src/lib/models/generic-entity.model';
import { Filter } from './filter.model';
import { TableView } from './table-view.model';

export class View extends GenericEntity {
  viewName: Map<string, string> = new Map<string, string>([
    ['pt', ''],
    ['en', ''],
    ['es', ''],
    ['fr', ''],
    ['de', ''],
    ['it', ''],
  ]);
  filters: Filter[] = [];
  tableViews: TableView[] = [];
}
