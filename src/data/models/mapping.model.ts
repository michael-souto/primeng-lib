import { Property } from "./property.model";
import { EntityRelationShip } from "./entity-relation-ship.model";

export class Mapping {
  id: string;
  columnIndex: string;
  property: Property;
  functions: Function[] = [];
  formattingExpression: string;
  configuration: string;
  entityRelationships: EntityRelationShip[];
}

export enum Function {
  REMOVE_FORMATTING = 'REMOVE_FORMATTING', // STRING
  REMOVE_LEFT_CHARACTERS = 'REMOVE_LEFT_CHARACTERS', // STRING
  REMOVE_RIGHT_CHARACTERS = 'REMOVE_RIGHT_CHARACTERS', // STRING
  TRIM_SIDE_WHITESPACE = 'TRIM_SIDE_WHITESPACE', // STRING
  REMOVE_ALL_WHITESPACE = 'REMOVE_ALL_WHITESPACE', // STRING
  TO_UPPERCASE = 'TO_UPPERCASE', // STRING
  TO_LOWERCASE = 'TO_LOWERCASE', // STRING
  CAPITALIZE_EACH_WORD = 'CAPITALIZE_EACH_WORD', // STRING
  APPLY_FORMATTING = 'APPLY_FORMATTING', // STRING
  DYNAMIC_INFORMATION = 'DYNAMIC_INFORMATION',
  FETCH_INFORMATION_FROM_ANOTHER_COLUMN_IF_EMPTY = 'FETCH_INFORMATION_FROM_ANOTHER_COLUMN_IF_EMPTY',
  COPY_PART_OF_TEXT = 'COPY_PART_OF_TEXT', // STRING
  COPY_PART_OF_TEXT_FROM_MULTIPLE_COLUMNS = 'COPY_PART_OF_TEXT_FROM_MULTIPLE_COLUMNS' // 54(1...25)
}
