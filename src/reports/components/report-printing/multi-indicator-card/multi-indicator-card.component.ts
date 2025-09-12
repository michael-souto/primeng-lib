import { Component, Input, OnInit } from "@angular/core";
import { ItemDashboard } from "../../../models/item-dashboard.model";

@Component({
  selector: "d-multi-indicator-card",
  templateUrl: "./multi-indicator-card.component.html",
  styleUrls: ["./multi-indicator-card.component.scss"],
})
export class MultiIndicatorCardComponent implements OnInit {
  @Input() title: string = "";
  @Input() mainValue: number = 0;
  @Input() data: ItemDashboard[] = [];
  @Input() showSum: boolean = true;

  ngOnInit() {
    this.mainValue = this.showSum
      ? this.data.reduce((acc, curr) => acc + curr.value, 0)
      : this.data[this.data.length - 1].value;
  }

  /**
   * Calcula a classe de coluna dinamicamente baseado na quantidade de itens
   * Máximo de 6 colunas por linha para manter legibilidade
   */
  getColumnClass(): string {
    const itemCount = this.data.length;

    if (itemCount === 0) return 'col-12';

    // Limita a 6 colunas por linha para manter legibilidade
    const effectiveCount = Math.min(itemCount, 6);

    // Calcula o número de colunas do PrimeNG (sistema de 12 colunas)
    const colSize = Math.floor(12 / effectiveCount);

    // Classes responsivas baseadas na quantidade de itens
    const baseClass = `col-${colSize}`;

    // Para dispositivos menores, ajusta conforme necessário
    let responsiveClasses = baseClass;

    if (effectiveCount <= 2) {
      responsiveClasses += ' md:col-6 lg:col-6 xl:col-6';
    } else if (effectiveCount === 3) {
      responsiveClasses += ' md:col-4 lg:col-4 xl:col-4';
    } else if (effectiveCount === 4) {
      responsiveClasses += ' md:col-3 lg:col-3 xl:col-3';
    } else if (effectiveCount === 5) {
      responsiveClasses += ' md:col-2 lg:col-2 xl:col-2';
    } else { // 6 ou mais
      responsiveClasses += ' md:col-2 lg:col-2 xl:col-2';
    }

    return responsiveClasses;
  }

  getItemValueClass(color: "good" | "warning" | "danger"): string {
    switch (color) {
      case "good":
        return "text-green";
      case "warning":
        return "text-yellow";
      case "danger":
        return "text-red";
      default:
        return "";
    }
  }
}
