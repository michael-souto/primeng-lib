import { Injectable } from '@angular/core';
import { CrudApiService } from 'projects/design-lib/src/lib/services/crud-api.service';
import { View } from 'projects/primeng-lib/src/reports/models/view.mode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewCrudApiService extends CrudApiService<View> {

  override getAdressAPI(masterId: string = null): string {
    return environment.apiURLGateway + '/report-core-api/view';
    return 'http://localhost:32003/view';
  }
}
