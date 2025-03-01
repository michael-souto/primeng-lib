import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudApiService } from 'projects/design-lib/src/lib/services/crud-api.service';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CustomReport } from '../models/custom-report.model';
import { ReportFilter } from '../models/report-filter.model';

@Injectable({
  providedIn: 'root'
})
export class CustomReportCrudApiService  extends CrudApiService<CustomReport> {

  override getAdressAPI(masterId: string = null): string {
    return environment.apiURLGateway + '/report-core-api/custom-report';
    return 'http://localhost:32003/custom-report';
  }

  printReport(identificadorRelatorio: string, filtros: ReportFilter []): Observable<any> {
    let params = new HttpParams();
    filtros.forEach(f => {
      if (['INTEGER', 'DATE'].includes(f.filter?.type)) {
        if (f['valueFrom']) {
          params = params.append(f.filter?.identifierName+'-from', (f.filter?.type as string) === 'DATE' ? f['valueFrom'].toISOString() : f['valueFrom']);
        }
        if (f['valueTo']) {
          params = params.append(f.filter?.identifierName+'-to', (f.filter?.type as string) === 'DATE' ? f['valueTo'].toISOString() : f['valueFrom']);
        }
      } else {
        if (f['value']) {
          params = params.append(f.filter?.identifierName, f['value']);
        }
      }
    });
    return this.utilsService.http.get<any>(`${this.getAdressAPI()}/${identificadorRelatorio}/print`, {params});

  }
}
