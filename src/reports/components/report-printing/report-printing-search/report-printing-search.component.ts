import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportPrintingControllerService } from '../report-printing-controller.service';

@Component({
  selector: 'lib-report-printing-search',
  templateUrl: './report-printing-search.component.html',
  styleUrls: ['./report-printing-search.component.scss'],
})
export class ReportPrintingSearchComponent  implements OnInit {

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    public controller: ReportPrintingControllerService) { }


  ngOnInit() {


  }

  onSelect(event: any) {
    this.controller.filterSelected['value'] = event;
    this.router.navigate(['../'], { relativeTo: this.activateRoute, queryParams: { load: 'false' } });
  }

}
