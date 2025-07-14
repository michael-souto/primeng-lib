import { Injectable } from '@angular/core';
import { ControllerService } from 'projects/design-lib/src/lib/services/controller.service';
import { ImportModel } from '../models/import-model.model';
import { FrameworkService } from 'projects/design-lib/src/lib/services/framework.service';
import { ActivatedRoute } from '@angular/router';
import { DetailCrudHelper } from 'projects/design-lib/src/lib/services/detail-crud-helper';
import { Mapping } from '../models/mapping.model';
import { Entity } from '../models/entity.model';
import { Property } from '../models/property.model';
import { environment } from 'src/environments/environment';
import { EntityCrudApiService } from 'projects/primeng-lib/src/data/services/entity-crud-api.service';

@Injectable({
  providedIn: 'root'
})
export class ImportModelsControllerService extends ControllerService<ImportModel> {

  constructor(
    protected override framework: FrameworkService,
    public activateRoute: ActivatedRoute,
    private entityCrudService: EntityCrudApiService
  ) {
    super(framework, ImportModel);
  }

  public mappingDetail: DetailCrudHelper<Mapping> = new DetailCrudHelper<Mapping>(this.framework, () => new Mapping());

  public newMapping() {
    this.loadProperties(this.object.entity);
    this.mappingDetail.newItem(this.object.mappings, 'mappings', this.framework.router, this.activateRoute);
  }

  public deleteMapping(mapping: Mapping) {
    this.mappingDetail.removeItem(mapping, this.object.mappings);
  }

  public editMapping(mapping: Mapping) {
    this.loadProperties(this.object.entity);
    this.mappingDetail.editItem(mapping, 'mappings', this.framework.router, this.activateRoute);
  }

  entitySelected: Entity;
  propertiesOfEntitySelected: Array<Property> = [];
  filteredPropertiesOfEntitySelected: Array<Property> = [];
  loadProperties(entitySelected: Entity) {
    if (!environment.production) {
      console.log('loadProperties', entitySelected);
    }

    this.entityCrudService.findById(entitySelected.id).subscribe((entity) => {
      if (entity) {
        entity['name'] = entity.entityName[this.framework.language];
        this.propertiesOfEntitySelected = [];
        this.alimentarPropriedades(
          entity,
          this.propertiesOfEntitySelected
        );
        const uniqueMap = new Map<string, Property>();
        this.propertiesOfEntitySelected.forEach(prop => {
          uniqueMap.set(prop.id!, prop);
        });
        this.propertiesOfEntitySelected = Array.from(uniqueMap.values())
          .sort((a, b) => a.entityType?.internalName!.localeCompare(b.entityType?.internalName!));
      }
    });
  }

  alimentarPropriedades(entidade: Entity, propriedadesArray: Property[]): void {
    if (entidade.properties) {
      entidade.properties.forEach((x) => {
        x["entityName"] = entidade.entityName;
        x["internalName"] = entidade.internalName;
      });
      propriedadesArray.push(
        ...entidade.properties.filter(
          (x) =>
            ["SUBORDINATE_ENTITY", "RELATED_ENTITY", "LIST"].indexOf(x.type) < 0
        )
      );
      for (const propriedade of entidade.properties.filter(x => ["SUBORDINATE_ENTITY", "RELATED_ENTITY", "LIST"].indexOf(x.type) >= 0)) {
        if ( propriedade.entityType && ["SUBORDINATE_ENTITY", "LIST"].indexOf(propriedade.type) >= 0 ) {
          this.alimentarPropriedades(propriedade.entityType, propriedadesArray);
        } else if (
          propriedade.entityType &&
          ["RELATED_ENTITY"].indexOf(propriedade.type) >= 0
        ) {
          propriedadesArray.push(propriedade);
        }
      }
    }
  }

  searchProperty(event: any) {
    this.filteredPropertiesOfEntitySelected =
      this.propertiesOfEntitySelected.filter(
        (x) =>
          x.propertyName[this.framework.language]
            .toLowerCase()
            .indexOf(event.query) >= 0
      );
  }
}
