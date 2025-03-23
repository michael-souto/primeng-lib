import { GenericEntity } from 'projects/design-lib/src/lib/models/generic-entity.model';
import { Entity } from './entity.model';
import { PropertyType } from './property-type.model';

export class Property extends GenericEntity {
  propertyName: Map<string, string>;
  entity: Entity;
  internalName: string;
  type: PropertyType;
  entityType: Entity;
  searchKey: boolean = false;
}
