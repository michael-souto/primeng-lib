import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReportPrintingControllerService } from "./report-printing-controller.service";
import { EventBusService } from "projects/design-lib/src/lib/services/event-bus.service";
import { FrameworkService } from "projects/design-lib/src/lib/services/framework.service";
import * as XLSX from 'xlsx';
import { DatePipe } from "@angular/common";


@Component({
  selector: "d-report-printing",
  templateUrl: "./report-printing.component.html",
  styleUrls: ["./report-printing.component.scss"],
  providers: [DatePipe]
})
export class ReportPrintingComponent implements OnInit {
  constructor(
    protected activatedRoute: ActivatedRoute,
    public controller: ReportPrintingControllerService,
    private eventBusService: EventBusService,
    public framework: FrameworkService,
    private datePipe: DatePipe
  ) {
    const navigation = this.framework.router.getCurrentNavigation();
    this.previousUrl = navigation?.previousNavigation?.finalUrl?.toString() || '';
  }

  private previousUrl: string = '';

  ngOnInit(): void {
    const id: string = this.activatedRoute.snapshot.params["id"];
    if (!this.previousUrl.includes('/print/')) {
      this.controller.loadReport(id);
    }
    this.eventBusService.emit({
      type: "report:printing",
      callback: () => this.controller.goToFilters(),
    });
  }

  ngOnDestroy(): void {
    const destinationUrl = this.framework.router.url;
    if (!destinationUrl.includes('/print/')) {
      this.controller.clearReport();
    }
  }

  getItemDashboardBySession(dataSession: []): any[] {
    return dataSession.map((x) => {
      const property = Object.keys(x);
      const propertyValue = property.filter((x) => x.indexOf("_total") > 0)[0];
      const propertyLabel = property.filter((x) => x.indexOf("_total") < 0)[0];
      return {
        label: x[propertyLabel] ?? "N/ Informado(a)",
        value: x[propertyValue] ?? 0,
      };
    });
  }

  getNumberCols(session: any): string {
    let displaySize = Math.round((session.displaySize * 12) / 100);
    displaySize = Math.max(1, Math.min(displaySize, 12));
    return `col-12 md:col-${displaySize}`;
  }

  exportToExcel(session: any): void {
    if (!session || !session.data || session.data.length === 0) {
      console.warn("Não há dados para exportar.");
      return;
    }

    const headerRow = session.headers.map(col => col.header);

    const dataRows = session.data.map(rowData => {
      return session.headers.map(col => {
        const cellValue = rowData[col.field];
        if (col.type === 'DATE' && cellValue) {
          return this.datePipe.transform(cellValue, 'dd/MM/yyyy');
        }
        return cellValue;
      });
    });

    const dataToExport = [headerRow, ...dataRows];

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataToExport);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Dados');

    const fileName = `${session.title.replace(/ /g, '_') || 'relatorio'}.xlsx`;
    XLSX.writeFile(wb, fileName);
  }
}
