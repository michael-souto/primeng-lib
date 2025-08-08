import { Entity } from "./entity.model";
import { Mapping } from "./mapping.model";

export class ImportModel {
  id: string;
  name: string;
  description: string;
  entity: Entity;
  mappings: Mapping[] = [];
  operation: Operation = Operation.CREATE;
  lineStart: number = 2;
  lineEnd: number;
  lineHeader: number = 1;
  skipBlankRows: boolean = true;
  groupFieldDefinitionId: string;
  complementFieldValue?: Map<string, any> = new Map<string, any>();
  complementFieldId?: string;
  complementFieldText?: string;
  complementFieldLabel?: string;
  complementFieldName?: string;
}

export enum Operation {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  CREATE_OR_UPDATE = 'CREATE_OR_UPDATE'
}
