import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ImportModelControllerService {
  constructor() {}

  private _complementFieldValue?: any;
  private _complementFieldId?: string;
  private _complementFieldText?: string;
  private _complementFieldLabel?: string;
  private _complementFieldName?: string;

  clear() {
    this._complementFieldValue = new Map<string, any>();
    this._complementFieldId = undefined;
    this._complementFieldText = undefined;
    this._complementFieldLabel = undefined;
    this._complementFieldName = undefined;
  }

  setComplementImportModel(
    label: string,
    value: any,
    id: string,
    text: string,
    name: string
  ) {
    this._complementFieldValue = value;
    this._complementFieldId = id;
    this._complementFieldText = text;
    this._complementFieldLabel = label;
    this._complementFieldName = name;
  }

  get complementFieldValue() {
    return this._complementFieldValue;
  }

  get complementFieldId() {
    return this._complementFieldId;
  }

  get complementFieldText() {
    return this._complementFieldText;
  }

  get complementFieldLabel() {
    return this._complementFieldLabel;
  }

  get complementFieldName() {
    return this._complementFieldName;
  }
}
