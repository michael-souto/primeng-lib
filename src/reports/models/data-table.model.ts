import { GenericEntity } from "projects/design-lib/src/lib/models/generic-entity.model";
import { Field } from "./field.model";

export class DataTable extends GenericEntity {
  name: string;
  description: string;
  connection?: string;
  sharedDatabase: boolean = false;
  fields: Field[] = [];
}
