
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FrameworkService } from 'projects/design-lib/src/lib/services/framework.service';
import { CustomReport } from 'projects/primeng-lib/src/reports/models/custom-report.model';
import { CustomReportCrudApiService } from 'projects/primeng-lib/src/reports/services/custom-report-crud-api.service';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'd-report-printing',
  templateUrl: './report-printing.component.html',
  styleUrls: ['./report-printing.component.scss'],
})
export class ReportPrintingComponent  implements OnInit {

  constructor(
    protected service: CustomReportCrudApiService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected framework: FrameworkService,
  ) {}

  relatorioCustomizado: CustomReport;
  report: any;

  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];
    if (id != null) {
      this.service.findById(id).subscribe((x: any) => {
        this.relatorioCustomizado = x;
      });
    }
  }

  emit() {
    this.service
      .printReport(
        this.relatorioCustomizado.id,
        this.relatorioCustomizado.filters
      )
      .subscribe((x) => {
        this.report = x;
      });
  }

  getItemDashboardBySession(dataSession: []): any[] {
    return dataSession.map((x) => {
      const property = Object.keys(x);
      const propertyValue = property.filter(x=> x.indexOf('_total') > 0)[0];
      const propertyLabel = property.filter(x=> x.indexOf('_total') < 0)[0];
      return {
        label: x[propertyLabel] ?? 'N/ Informado(a)',
        value: x[propertyValue] ?? 0,
      };
    });
  }

  getNumberCols(session: any): string {
    let displaySize = Math.round((session.displaySize * 12) / 100);
    displaySize = Math.max(1, Math.min(displaySize, 12));
    return `col-12 md:col-${displaySize}`;
}


  goList(){
    this.framework.location.back();
  }

  downloadPDF() {
    console.log('downloadPDF');
    const element = document.getElementById('pdfContent');
    if (element) {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Calcula a altura da imagem em relação à largura do PDF
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Adiciona a primeira parte
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        // Enquanto ainda houver conteúdo não adicionado, cria novas páginas
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
          heightLeft -= pdfHeight;
        }

        pdf.save('documento.pdf');
      });
    }
  }

}
