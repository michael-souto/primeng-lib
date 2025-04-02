import { Injectable } from '@angular/core';
import { UtilsService } from 'projects/design-lib/src/lib/services/utils/utils.service';
import {
  FieldValidator,
  ValidatorModelService,
} from 'projects/design-lib/src/lib/services/validator-model.service';
import { Entity } from 'projects/primeng-lib/src/data/models/entity.model';

@Injectable({
  providedIn: 'root',
})
export class EntityValidatorModelService extends ValidatorModelService<Entity> {
  protected override _fields = {
    entityName: new FieldValidator(),
    internalName: new FieldValidator(),
    description: new FieldValidator(),
    primaryEntity: new FieldValidator(),
    accessLocation: new FieldValidator(),
    properties: new FieldValidator(),
  };

  override async loadTextMessages() {
    let fieldMessage = await this.utilsService.getTextTranslated('ENTITIES.ENTITY_NAME');
    this._fields.entityName.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });

    fieldMessage = await this.utilsService.getTextTranslated('ENTITIES.INTERNAL_NAME');
    this._fields.internalName.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });

    fieldMessage = await this.utilsService.getTextTranslated('ENTITIES.DESCRIPTION');
    this._fields.description.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });

    fieldMessage = await this.utilsService.getTextTranslated('ENTITIES.PRIMARY_ENTITY');
    this._fields.primaryEntity.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });

    fieldMessage = await this.utilsService.getTextTranslated('ENTITIES.ACCESS_LOCATION');
    this._fields.accessLocation.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });

    fieldMessage = await this.utilsService.getTextTranslated('ENTITIES.PROPERTIES');
    this._fields.properties.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });
  }

  protected override validate() {
    this.validateEntityName();
    this.validateInternalName();
    this.validateDescription();
    this.validatePrimaryEntity();
    this.validateAccessLocation();
    this.validateProperties();
    this._valid = this.areAllFieldsValid();
  }
  protected override validateForDelete() {}

  private validateEntityName() {
    this._fields.entityName.isValid = !UtilsService.isEmpty(
      this.object.entityName['pt']
    );
  }
  private validateInternalName() {
    this._fields.internalName.isValid = !UtilsService.isEmpty(
      this.object.internalName
    );
  }
  private validateDescription() {
    this._fields.description.isValid = !UtilsService.isEmpty(
      this.object.description
    );
  }
  private validatePrimaryEntity() {
    this._fields.primaryEntity.isValid = !UtilsService.isEmpty(
      this.object.primaryEntity
    );
  }
  private validateAccessLocation() {
    this._fields.accessLocation.isValid = !UtilsService.isEmpty(
      this.object.accessLocation
    );
  }
  private validateProperties() {
    this._fields.properties.isValid = this.object.properties.length > 0;
  }
}
