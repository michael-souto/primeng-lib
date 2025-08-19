import { Component, OnInit } from '@angular/core';
import { ReportPrintingControllerService } from '../report-printing-controller.service';
import { FrameworkService } from 'projects/design-lib/src/lib/services/framework.service';
import { EventBusService } from 'projects/design-lib/src/lib/services/event-bus.service';

@Component({
  selector: 'lib-report-printing-search',
  templateUrl: './report-printing-search.component.html',
  styleUrls: ['./report-printing-search.component.scss'],
})
export class ReportPrintingSearchComponent  implements OnInit {

  constructor(
    public controller: ReportPrintingControllerService,
    public framework: FrameworkService,
    public eventBusService: EventBusService
  ) { }


  ngOnInit() {
    this.eventBusService.emit({ type: 'report:search' });
  }

  onSelect(event: any) {
    this.controller.filterSelected['value'] = event;
    this.framework.location.back();
  }
}
