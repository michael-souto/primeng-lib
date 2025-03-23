import { GenericEntity } from 'projects/design-lib/src/lib/models/generic-entity.model';
import { Property } from './property.model';

export class Entity extends GenericEntity {
  entityName: Map<string, string>;
  internalName: string;
  description: string;
  primaryEntity: boolean = false;
  accessLocation: string;
  properties: Property[] = [];
}
