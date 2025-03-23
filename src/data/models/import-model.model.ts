import { Entity } from "./entity.model";
import { Mapping } from "./mapping.model";

export class ImportModel {
  id: string;
  name: string;
  description: string;
  entity: Entity;
  mappings: Mapping[] = [];
  operation: Operation = Operation.CREATE;
}

export enum Operation {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  CREATE_OR_UPDATE = 'CREATE_OR_UPDATE'
}
