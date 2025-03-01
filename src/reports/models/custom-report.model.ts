import { GenericEntity } from 'projects/design-lib/src/lib/models/generic-entity.model';
import { ReportType } from './report-type.model';
import { View } from './view.mode';
import { ReportFilter } from './report-filter.model';
import { ReportSession } from './report-session.model';
import { AccessProfile } from './access-profile.model';

export class CustomReport extends GenericEntity {
  name: string;
  reportType: ReportType;
  view: View;
  filters: ReportFilter[] = [];
  sessions: ReportSession[] = [];
  detrasoftId: number;
  restricted: boolean;
  restrictedAccessProfiles: AccessProfile[] = [];
}
