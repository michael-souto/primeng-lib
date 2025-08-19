import { Component, OnInit } from "@angular/core";
import { ReportPrintingControllerService } from "../report-printing-controller.service";
import { FrameworkService } from "projects/design-lib/src/lib/services/framework.service";
import { ActivatedRoute } from "@angular/router";
import { EventBusService } from "projects/design-lib/src/lib/services/event-bus.service";

@Component({
  selector: "lib-report-printing-filter",
  templateUrl: "./report-printing-filter.component.html",
  styleUrls: ["./report-printing-filter.component.scss"],
})
export class ReportPrintingFilterComponent implements OnInit {
  constructor(
    public controller: ReportPrintingControllerService,
    public framework: FrameworkService,
    public activatedRoute: ActivatedRoute,
    public eventBusService: EventBusService
  ) {}

  ngOnInit() {
    if (this.controller.customReport?.id == null) {
      this.framework.router.navigate(["/reports"]);
    }
    this.eventBusService.emit({
      type: "report:filters",
      callback: () => this.controller.emit(),
    });
  }

    setDateRange(filtro: any, range: 'day' | 'week' | 'month' | 'clear'): void {
      if (range === 'clear') {
        filtro.valueFrom = null;
        filtro.valueTo = null;
        return;
      }


      const hoje = new Date();

      let dataInicio: Date;
      let dataFim: Date;

      switch (range) {
        case 'day':
          dataInicio = hoje;
          dataFim = hoje;
          break;

        case 'week':
          const diaDaSemana = hoje.getDay();
          const diffInicio = hoje.getDate() - diaDaSemana + (diaDaSemana === 0 ? -6 : 1);

          dataInicio = new Date(hoje.setDate(diffInicio));
          dataFim = new Date(dataInicio);
          dataFim.setDate(dataInicio.getDate() + 6);
          break;

        case 'month':
          const ano = hoje.getFullYear();
          const mes = hoje.getMonth();

          dataInicio = new Date(ano, mes, 1);
          dataFim = new Date(ano, mes + 1, 0);
          break;
      }

      filtro.valueFrom = new Date(dataInicio);
      filtro.valueTo = new Date(dataFim);
    }

}
