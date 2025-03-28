import { Component, Input } from "@angular/core";
import { FrameworkService } from "projects/design-lib/src/lib/services/framework.service";

@Component({
  selector: "lib-data-viewer",
  templateUrl: "./data-viewer.component.html",
  styleUrls: ["./data-viewer.component.scss"],
})
export class DataViewerComponent {
  constructor(protected frameworkService: FrameworkService) {}

  @Input() data: any;
  @Input() panelTitle: string = "Item #";
  priorityKeys = ["code", "title", "description", "name", "id"];

  get sortedKeys(): string[] {
    if (!this.data) return [];

    const allKeys = Object.keys(this.data);
    const normalKeys = allKeys.filter(
      (k) => !this.priorityKeys.includes(k) && !this.isArray(this.data[k])
    );
    const arrayKeys = allKeys.filter((k) => this.isArray(this.data[k]));

    const result = [
      ...this.priorityKeys.filter((k) => allKeys.includes(k)),
      ...normalKeys,
      ...arrayKeys,
    ];
    return result;
  }

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  isPrimitive(value: any): boolean {
    return (
      value === null ||
      value === undefined ||
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      value instanceof Date
    );
  }

  generatePanelTitle(obj: any) {
    if (!obj) return "Item";
    if (obj.code || obj.title || obj.name || obj.id) {
      return "#" + (obj.code || obj.title || obj.name || obj.id) + " - ";
    }
    return "";
  }
}
