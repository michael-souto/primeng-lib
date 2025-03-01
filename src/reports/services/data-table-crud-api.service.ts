import { Injectable } from '@angular/core';
import { CrudApiService } from 'projects/design-lib/src/lib/services/crud-api.service';
import { DataTable } from 'projects/primeng-lib/src/reports/models/data-table.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataTableCrudApiService extends CrudApiService<DataTable> {

  override getAdressAPI(masterId: string = null): string {
    return environment.apiURLGateway + '/report-core-api/data-table';
    return 'http://localhost:32003/data-table';
  }
}
