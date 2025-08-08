import { Property } from "./property.model";
import { EntityRelationShip } from "./entity-relation-ship.model";
import { MappingFunction } from "./mapping-function.model";

export class Mapping {
  id: string;
  columnIndex: string;
  columnName: string;
  columnLabel: string;
  property: Property;
  destination: Destination;
  functions: MappingFunction[] = [];
  formattingExpression: string;
  configuration: string;
  entityRelationships: EntityRelationShip[];
}

export enum Destination {
  USE_CURRENT_FIELD = 'USE_CURRENT_FIELD',
  NEW_CUSTOM_FIELD = 'NEW_CUSTOM_FIELD',
  DO_NOTHING_WITH_COLUMN = 'DO_NOTHING_WITH_COLUMN',
}
