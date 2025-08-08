import { Injectable } from '@angular/core';
import { ImportModel } from '../models/import-model.model';
import { CrudApiService } from 'projects/design-lib/src/lib/services/crud-api.service';
import { environment } from 'src/environments/environment';
import { HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportModelCrudApiService extends CrudApiService<ImportModel> {

  override getAdressAPI(masterId: string = null): string {
    return environment.apiURLGateway + '/data-core-api/data/import-model';
    return 'http://localhost:32004/import-model';
  }

  findByComplementFieldId(complementFieldId: string) {
    return this.utilsService.http.get<ImportModel>(`${this.getAdressAPI()}/complement-field-id/${complementFieldId}`);
  }

  processData(file: any, importModelId: string) {
    const formData = new FormData();
    formData.append("file", new File([file], file.name.replace(/ /g, "_"), { type: file.type }));
    return this.utilsService.http.post(`${environment.apiURLGateway}/data-core-api/data/import/${importModelId}/process`, formData);
  }

  processDataWithUnsavedImportModel(file: File, unsavedImportModel: ImportModel): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('import-model', JSON.stringify(unsavedImportModel));
    const headers = new HttpHeaders();

    return this.utilsService.http.post(`${environment.apiURLGateway}/data-core-api/data/import/process`, formData);
  }
}
