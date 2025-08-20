import { Component, OnInit } from "@angular/core";
import { FrameworkService } from "projects/design-lib/src/lib/services/framework.service";
import { CustomReportsControllerService } from "../../../services/custom-reports-controller.service";
import { EventBusService } from "projects/design-lib/src/lib/services/event-bus.service";

@Component({
  selector: "d-session-report-register",
  templateUrl: "./session-report-register.component.html",
  styleUrls: ["./session-report-register.component.scss"],
})
export class SessionReportRegisterComponent implements OnInit {
  constructor(
    public controller: CustomReportsControllerService,
    public framework: FrameworkService,
    private eventBusService: EventBusService
  ) {}

  visibles = {
    footer: true,
    backButton: true,
    saveButton: true,
  }

  ngOnInit() {
    this.eventBusService.emit({
      type: "report:register-session",
      payload: {
        visibles: this.visibles,
      },
      callback: () => this.controller.sessionDetail.saveItem()
    });
  }
}
