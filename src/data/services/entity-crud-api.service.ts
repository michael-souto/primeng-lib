import { Injectable } from '@angular/core';
import { CrudApiService } from 'projects/design-lib/src/lib/services/crud-api.service';
import { Entity } from 'projects/primeng-lib/src/data/models/entity.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntityCrudApiService extends CrudApiService<Entity> {
  override getAdressAPI(masterId: string = null): string {
    return environment.apiURLGateway + '/data-core-api/data/entity';
  }

  getEntityByInternalName(internalName: string): Observable<Entity> {
    return this.utilsService.http.get<Entity>(`${this.getAdressAPI()}/internal-name/${internalName}`);
  }
}
