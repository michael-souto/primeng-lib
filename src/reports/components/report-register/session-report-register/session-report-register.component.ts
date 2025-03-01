import { Component, OnInit } from '@angular/core';
import { FrameworkService } from 'projects/design-lib/src/lib/services/framework.service';
import { CustomReportsControllerService } from '../../../services/custom-reports-controller.service';

@Component({
  selector: 'd-session-report-register',
  templateUrl: './session-report-register.component.html',
  styleUrls: ['./session-report-register.component.scss'],
})
export class SessionReportRegisterComponent {

  constructor(
    public controller: CustomReportsControllerService,
    public framework: FrameworkService
  ) { }

}
