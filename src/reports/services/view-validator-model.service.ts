import { Injectable } from '@angular/core';
import { FieldValidator, ValidatorModelService } from 'projects/design-lib/src/lib/services/validator-model.service';
import { View } from 'projects/primeng-lib/src/reports/models/view.mode';
import { UtilsService } from 'projects/design-lib/src/lib/services/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class ViewValidatorModelService extends ValidatorModelService<View> {

  protected override _fields = {
    viewName: new FieldValidator(),
    filters: new FieldValidator(),
    tableViews: new FieldValidator(),
  };

  override async loadTextMessages() {
    let fieldMessage = await this.utilsService.getTextTranslated(
      'VIEWS.NAME'
    );
    this._fields.viewName.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });

    fieldMessage = await this.utilsService.getTextTranslated(
      'VIEWS.FILTERS'
    );
    this._fields.filters.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });

    fieldMessage = await this.utilsService.getTextTranslated(
      'VIEWS.TABLE_VIEWS'
    );
    this._fields.tableViews.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });
  }

  override validate() {
    this.validateName();
    this.validateFilters();
    this.validateTableViews();
    this._valid = this.areAllFieldsValid();
  }

  private validateName() {
    this._fields.viewName.isValid = !UtilsService.isEmpty(this.object.viewName['pt']);
  }

  private validateFilters() {
    this._fields.filters.isValid = this.object.filters?.length > 0;
  }

  private validateTableViews() {
    this._fields.tableViews.isValid = this.object.tableViews?.length > 0;
  }

  protected override validateForDelete() {}
}
