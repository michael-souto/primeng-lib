import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ImportModelCrudApiService } from "../../services/import-model-crud-api.service";
import { ImportModelsControllerService } from "../../services/import-models-controller.service";
import { FrameworkService } from "projects/design-lib/src/lib/services/framework.service";
import { ActivatedRoute } from "@angular/router";
import { ImportModelValidatiorModelService } from "../../services/import-model-validatior-model.service";
import { ResponseNotification } from "projects/design-lib/src/lib/models/response-notification";
import { ImportModel, Operation } from "../../models/import-model.model";
import { CrudScreenComponent } from "projects/primeng-lib/src/lib/components/crud-screen/crud-screen.component";
import { EventBusService } from "projects/design-lib/src/lib/services/event-bus.service";

@Component({
  selector: "lib-import-model-register",
  templateUrl: "./import-model-register.component.html",
  styleUrls: ["./import-model-register.component.scss"],
})
export class ImportModelRegisterComponent implements OnInit, AfterViewInit {
  constructor(
    public service: ImportModelCrudApiService,
    public validator: ImportModelValidatiorModelService,
    public controller: ImportModelsControllerService,
    public framework: FrameworkService,
    public activateRoute: ActivatedRoute,
    private eventBusService: EventBusService
  ) {
    this.controller.activateRoute = this.activateRoute;
    if (this.controller.object?.mappings) {
      this.controller.object.mappings = this.controller.object.mappings.sort(
        (a, b) =>
          a.columnIndex.localeCompare(b.columnIndex, undefined, {
            numeric: false,
          })
      );
    }
  }

  @ViewChild("crudScreen") crudScreen: CrudScreenComponent<ImportModel>;

  operations = [];

  ngAfterViewInit(): void {
    this.crudScreen.initialObjectState =
      this.controller.getInitialObjectState();

      this.eventBusService.emit({
        type: "report:register:after-view-init",
        payload: {
          object: this.controller.object,
          crudScreen: this.crudScreen,
          callbackSave: () => {
            this.crudScreen.save();
          },
          callbackDelete: () => {
            this.crudScreen.confirmDelete();
          },
        },
      });
  }


  async ngOnInit() {
    this.operations = await this.framework.utils.getOptionsFromEnum(
      Operation,
      "OPERATIONS"
    );
  }

  onAfterInitRegister() {
    this.controller.entitySelected = this.controller.object.entity;
  }

  onBeforeInitializeEntity(importModel: ImportModel) {
    if (importModel.entity?.id) {
      importModel.entity["name"] =
        importModel.entity.entityName[this.framework.language];
    }
  }

  beforeSave() {
    this.controller.mappingDetail.beforeSave();
  }

  afterSave(response: ResponseNotification<any>) {
    this.controller.mappingDetail.afterSave();
  }

  onSelectEntity(event: any) {
    if (
      this.controller.object.entity == null ||
      event == null ||
      event.id != this.controller.object.entity.id
    ) {
      this.controller.object.entity = event;
      this.controller.object.mappings = [];
      if (event?.id) {
        this.controller.loadProperties(event);
      }
    }
  }
}
