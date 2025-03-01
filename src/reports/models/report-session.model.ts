import { GenericEntity } from 'projects/design-lib/src/lib/models/generic-entity.model';
import { SessionType } from './session-type.model';
import { SessionField } from './session-field.model';

export class ReportSession extends GenericEntity {
  title: string;
  description?: string;
  ordering: number;
  displaySize?: number;
  type: SessionType = SessionType.TABLE_COLUMN;
  clickAction?: string;
  dashboardItem?: boolean;
  fields: SessionField[] = [];
}
