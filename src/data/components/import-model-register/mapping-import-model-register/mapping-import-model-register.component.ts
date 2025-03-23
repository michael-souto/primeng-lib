import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ImportModelsControllerService } from "../../../services/import-models-controller.service";
import { FrameworkService } from "projects/design-lib/src/lib/services/framework.service";
import { Property } from "../../../models/property.model";
import { Function } from "../../../models/mapping.model";

@Component({
  selector: "lib-mapping-import-model-register",
  templateUrl: "./mapping-import-model-register.component.html",
  styleUrls: ["./mapping-import-model-register.component.scss"],
})
export class MappingImportModelRegisterComponent implements OnInit {
  constructor(
    public controller: ImportModelsControllerService,
    public framework: FrameworkService,
    public activateRoute: ActivatedRoute
  ) {
    this.controller.activateRoute = this.activateRoute;
  }

  filteredLetters: string[] = [];

  filterLetter(event: { query: string }) {
    const maxExcelColumns = 16384; // máximo de colunas no Excel (XFD)
    this.filteredLetters = [];

    for (let i = 1; i <= maxExcelColumns; i++) {
      const letter = this.numberToExcelColumn(i);

      if (letter.toLowerCase().startsWith(event.query.toLowerCase())) {
        this.filteredLetters.push(letter);
      }

      if (this.filteredLetters.length >= 50) {
        // limita sugestões para melhor performance
        break;
      }
    }
  }

  numberToExcelColumn(num: number): string {
    let column = "";

    while (num > 0) {
      const remainder = (num - 1) % 26;
      column = String.fromCharCode(65 + remainder) + column;
      num = Math.floor((num - 1) / 26);
    }

    return column;
  }

  functionsOptions: any[] = [];

  async ngOnInit() {
    this.functionsOptions = await this.framework.utils.getOptionsFromEnum(
      Function,
      "FUNCTIONS"
    );
  }
}
