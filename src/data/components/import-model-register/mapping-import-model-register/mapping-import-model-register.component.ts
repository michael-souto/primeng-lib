import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ImportModelsControllerService } from "../../../services/import-models-controller.service";
import { FrameworkService } from "projects/design-lib/src/lib/services/framework.service";

@Component({
  selector: "lib-mapping-import-model-register",
  templateUrl: "./mapping-import-model-register.component.html",
  styleUrls: ["./mapping-import-model-register.component.scss"],
})
export class MappingImportModelRegisterComponent {
  constructor(
    public controller: ImportModelsControllerService,
    public framework: FrameworkService,
    public activateRoute: ActivatedRoute
  ) {
    this.controller.activateRoute = this.activateRoute;
  }
}
