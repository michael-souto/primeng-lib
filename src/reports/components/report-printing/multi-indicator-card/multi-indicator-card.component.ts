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
