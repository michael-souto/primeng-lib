import { Injectable } from '@angular/core';
import { ImportModel } from '../models/import-model.model';
import { CrudApiService } from 'projects/design-lib/src/lib/services/crud-api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImportModelCrudApiService extends CrudApiService<ImportModel> {

  override getAdressAPI(masterId: string = null): string {
    return environment.apiURLGateway + '/data-core-api/data/import-model';
    return 'http://localhost:32004/import-model';
  }

  processData(file: any, importModelId: string) {
    const formData = new FormData();
    formData.append("file", new File([file], file.name.replace(/ /g, "_"), { type: file.type }));
    return this.utilsService.http.post(`${environment.apiURLGateway}/data-core-api/data/import/${importModelId}/process`, formData);
  }
}
