import { Component, OnInit, ViewChild } from "@angular/core";
import { CustomReportCrudApiService } from "projects/primeng-lib/src/reports/services/custom-report-crud-api.service";
import { CustomReportValidatorModelService } from "projects/primeng-lib/src/reports/services/custom-report-validator-model.service";
import { CustomReportsControllerService } from "projects/primeng-lib/src/reports/services/custom-reports-controller.service";
import { FrameworkService } from "projects/design-lib/src/lib/services/framework.service";
import { ActivatedRoute } from "@angular/router";
import { ResponseNotification } from "projects/design-lib/src/lib/models/response-notification";
import { ViewCrudApiService } from "projects/primeng-lib/src/reports/services/view-crud-api.service";

import { View } from "projects/primeng-lib/src/reports/models/view.mode";
import { environment } from "src/environments/environment";
import { FunctionsService } from "projects/design-lib/src/lib/services/functions.service";
import { EventBusService } from "projects/design-lib/src/lib/services/event-bus.service";
import { CrudScreenComponent } from "projects/primeng-lib/src/lib/components/crud-screen/crud-screen.component";
import { CustomReport } from "../../models/custom-report.model";

@Component({
  selector: "d-custom-report-register",
  templateUrl: "./report-register.component.html",
  styleUrls: ["./report-register.component.scss"],
})
export class ReportRegisterComponent {
  constructor(
    public service: CustomReportCrudApiService,
    public validator: CustomReportValidatorModelService,
    public controller: CustomReportsControllerService,
    public framework: FrameworkService,
    public activateRoute: ActivatedRoute,
    public viewCrudApiService: ViewCrudApiService,
    private eventBusService: EventBusService
  ) {
    this.controller.activateRoute = this.activateRoute;
  }

  @ViewChild("crudScreen") crudScreen: CrudScreenComponent<CustomReport>;

  onAfterInitRegister() {
    this.controller.viewSelected = {
      id: this.controller.object.view?.id,
      name: this.controller.object.view?.viewName["pt"],
    };
    this.onSelectView(this.controller.object.view);

    this.eventBusService.emit({
      type: "report:register",
      payload: this.controller.object,
      callback: () => {
        this.crudScreen.save();
      },
    });

    if (this.controller.object.id) {
      this.eventBusService.emit({
        type: "report:delete",
        payload: this.controller.object,
        callback: () => {
          this.crudScreen.confirmDelete();
        },
      });
    }
  }

  beforeSave() {
    this.controller.filterDetail.beforeSave();
    this.controller.sessionDetail.beforeSave();
    this.controller.object.filters.forEach((filter) => {
      if (!FunctionsService.isEmpty(filter.filter.externalSearchId)) {
        filter.multipleValues = true;
      } else {
        filter.multipleValues = false;
      }
    });
  }

  afterSave(response: ResponseNotification<any>) {
    this.controller.filterDetail.afterSave();
    this.controller.sessionDetail.afterSave();
  }

  onSelectView(value: View) {
    if (value) {
      this.viewCrudApiService.findById(value.id).subscribe((response) => {
        this.controller.loadFields(response);
      });
    }
  }

  onReorderSessions(event: any) {
    for (
      let index = 0;
      index < this.controller.object.sessions.length;
      index++
    ) {
      this.controller.object.sessions[index].ordering = index + 1;
    }
  }

  onReorderFilters(event: any) {
    for (
      let index = 0;
      index < this.controller.object.filters.length;
      index++
    ) {
      this.controller.object.filters[index].ordering = index + 1;
    }
  }
}
