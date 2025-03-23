import { Injectable } from '@angular/core';
import { FieldValidator, ValidatorModelService } from 'projects/design-lib/src/lib/services/validator-model.service';
import { ImportModel } from '../models/import-model.model';
import { UtilsService } from 'projects/design-lib/src/lib/services/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class ImportModelValidatiorModelService extends ValidatorModelService<ImportModel> {

  protected override _fields = {
    name: new FieldValidator(),
    description: new FieldValidator(),
    entity: new FieldValidator(),
    mappings: new FieldValidator(),
    operation: new FieldValidator(),
  };

  override async loadTextMessages() {
    let fieldMessage = await this.utilsService.getTextTranslated('IMPORT_MODELS.NAME');
    this._fields.name.invalidMessage = await this.utilsService.getTextTranslated('FIELD_REQUIRED', { field: fieldMessage });

    fieldMessage = await this.utilsService.getTextTranslated('IMPORT_MODELS.DESCRIPTION');
    this._fields.description.invalidMessage = await this.utilsService.getTextTranslated('FIELD_REQUIRED', { field: fieldMessage });

    fieldMessage = await this.utilsService.getTextTranslated('IMPORT_MODELS.ENTITY');
    this._fields.entity.invalidMessage = await this.utilsService.getTextTranslated('FIELD_REQUIRED', { field: fieldMessage });

    fieldMessage = await this.utilsService.getTextTranslated('IMPORT_MODELS.MAPPINGS');
    this._fields.mappings.invalidMessage = await this.utilsService.getTextTranslated('FIELD_REQUIRED', { field: fieldMessage });
  }

  override validate() {
    this.validateName();
    this.validateDescription();
    this.validateEntity();
    this.validateMappings();
    this.validateOperation();
  }

  private validateName() {
    this._fields.name.isValid = !UtilsService.isEmpty(this.object.name);
  }

  private validateDescription() {
    this._fields.description.isValid = !UtilsService.isEmpty(this.object.description);
  }

  private validateEntity() {
    this._fields.entity.isValid = !UtilsService.isEmpty(this.object.entity);
  }

  private validateMappings() {
    this._fields.mappings.isValid = this.object.mappings.length > 0;
  }

  private validateOperation() {
    this._fields.operation.isValid = !UtilsService.isEmpty(this.object.operation);
  }

  protected override validateForDelete() {}

}
