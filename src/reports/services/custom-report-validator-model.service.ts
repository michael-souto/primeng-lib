import { Injectable } from '@angular/core';
import { UtilsService } from 'projects/design-lib/src/lib/services/utils/utils.service';
import { FieldValidator, ValidatorModelService } from 'projects/design-lib/src/lib/services/validator-model.service';
import { CustomReport } from '../models/custom-report.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomReportValidatorModelService extends ValidatorModelService<CustomReport> {
  protected override _fields = {
    name: new FieldValidator(),
    reportType: new FieldValidator(),
    view: new FieldValidator(),
    filters: new FieldValidator(),
    sessions: new FieldValidator(),
    restricted: new FieldValidator(),
    restrictedAccessProfiles: new FieldValidator(),
  };

  override async loadTextMessages() {
    let fieldMessage = await this.utilsService.getTextTranslated(
      'CUSTOM_REPORTS.NAME'
    );
    this._fields.name.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });

    fieldMessage = await this.utilsService.getTextTranslated(
      'CUSTOM_REPORTS.REPORT_TYPE'
    );
    this._fields.reportType.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });

    fieldMessage = await this.utilsService.getTextTranslated(
      'CUSTOM_REPORTS.VIEW'
    );
    this._fields.view.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });

    fieldMessage = await this.utilsService.getTextTranslated(
      'CUSTOM_REPORTS.FILTERS'
    );
    this._fields.filters.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });

    fieldMessage = await this.utilsService.getTextTranslated(
      'CUSTOM_REPORTS.SESSIONS'
    );
    this._fields.sessions.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });

    fieldMessage = await this.utilsService.getTextTranslated(
      'CUSTOM_REPORTS.RESTRICTED'
    );
    this._fields.restricted.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });

    fieldMessage = await this.utilsService.getTextTranslated(
      'CUSTOM_REPORTS.RESTRICTED_ACCESS_PROFILES'
    );
    this._fields.restrictedAccessProfiles.invalidMessage =
      await this.utilsService.getTextTranslated('FIELD_REQUIRED', {
        field: fieldMessage,
      });
  }

  override validate() {
    this.validateName();
    this.validateReportType();
    this.validateView();
    this.validateFilters();
    this.validateSessions();
    this.validateRestricted();
    this._valid = this.areAllFieldsValid();
  }

  private validateName() {
    this._fields.name.isValid = !UtilsService.isEmpty(this.object.name);
  }

  protected override validateForDelete() {}

  private validateReportType() {
    this._fields.reportType.isValid = !UtilsService.isEmpty(this.object.reportType);
  }

  private validateView() {
    this._fields.view.isValid = !UtilsService.isEmpty(this.object.view?.id);
  }

  private validateFilters() {
    this._fields.filters.isValid = this.object.filters?.length > 0;
  }

  private validateSessions() {
    this._fields.sessions.isValid = this.object.sessions?.length > 0;
  }

  private validateRestricted() {
    if (this.object.restricted != null && this.object.restricted == true) {
      this._fields.restricted.isValid = this._fields.restrictedAccessProfiles.isValid = this.object.restrictedAccessProfiles?.length > 0;
    } else {
      this._fields.restrictedAccessProfiles.isValid = true;
      this._fields.restricted.isValid = true;
    }
  }

}
