import { Component, Input, OnInit } from "@angular/core";
import { ItemDashboard } from "../../../models/item-dashboard.model";

@Component({
  selector: "d-indicator-card",
  templateUrl: "./indicator-card.component.html",
  styleUrls: ["./indicator-card.component.scss"],
})
export class IndicatorCardComponent implements OnInit {
  constructor() {}

  @Input() title: string;
  @Input() data: ItemDashboard[];
  @Input() color: string = "blue";
  @Input() showSum: boolean = true;
  value: number;

  ngOnInit() {
    if (this.showSum) {
      this.value = this.data?.reduce((acc, curr) => acc + curr.value, 0);
    } else {
      this.value = this.data?.[this.data.length - 1].value;
    }
  }
}
