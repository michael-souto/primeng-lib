import { GenericEntity } from "projects/design-lib/src/lib/models/generic-entity.model";
import { DataType } from "./data-type.model";

export class Filter extends GenericEntity {
  identifierName: string;
  alias?: string;
  filterDescription: Map<string, string> = new Map<string, string>([
    ['pt', ''],
    ['en', ''],
    ['es', ''],
    ['fr', ''],
    ['de', ''],
    ['it', ''],
  ]);
  type: DataType;
  conditionalExpression: string;

  externalSearchApiName: string;
  externalSearchId: string;
  externalSearchReturnField: string;
  externalSearchDescriptionField: string;
}
