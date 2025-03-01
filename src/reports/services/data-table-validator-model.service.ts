import { Injectable } from '@angular/core';
import { UtilsService } from 'projects/design-lib/src/lib/services/utils/utils.service';
import {
  FieldValidator,
  ValidatorModelService,
} from 'projects/design-lib/src/lib/services/validator-model.service';
import { DataTable } from 'projects/primeng-lib/src/reports/models/data-table.model';

@Injectable({
  providedIn: 'root',
})
export class DataTableValidatorModelService extends ValidatorModelService<DataTable> {
  protected override _fields = {
    name: new FieldValidator(),
    description: new FieldValidator(),
    connection: new FieldValidator(),
    sharedDatabase: new FieldValidator(),
    fields: new FieldValidator(),
  };

  override async loadTextMessages() {
    let fieldMessage = await this.utilsService.getTextTranslated(
      'DATA_TABLES.NAME'
    );
    this._fields.name.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });

    fieldMessage = await this.utilsService.getTextTranslated(
      'DATA_TABLES.DESCRIPTION_TABLE'
    );
    this._fields.description.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });

    fieldMessage = await this.utilsService.getTextTranslated(
      'DATA_TABLES.CONNECTION'
    );
    this._fields.connection.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });

    fieldMessage = await this.utilsService.getTextTranslated(
      'DATA_TABLES.SHARED_DATABASE'
    );
    this._fields.sharedDatabase.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });

    fieldMessage = await this.utilsService.getTextTranslated(
      'DATA_TABLES.FIELDS'
    );
    this._fields.fields.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });
  }

  override validate() {
    this.validateName();
    this.validateDescription();
    this.validateConnection();
    this.validateSharedDatabase();
    this.validateFields();
    this._valid = this.areAllFieldsValid();
  }

  private validateName() {
    this._fields.name.isValid = !UtilsService.isEmpty(this.object.name);
  }

  protected override validateForDelete() {}

  private validateDescription() {
    this._fields.description.isValid = !UtilsService.isEmpty(this.object.description);
  }

  private validateConnection() {
    this._fields.connection.isValid = !UtilsService.isEmpty(this.object.connection);
  }

  private validateSharedDatabase() {
    this._fields.sharedDatabase.isValid = !UtilsService.isEmpty(this.object.sharedDatabase);
  }

  private validateFields() {
    this._fields.fields.isValid = this.object.fields?.length > 0;
  }
}
