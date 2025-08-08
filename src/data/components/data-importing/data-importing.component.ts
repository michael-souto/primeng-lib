import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ImportModelCrudApiService } from "../../services/import-model-crud-api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FrameworkService } from "projects/design-lib/src/lib/services/framework.service";
import { MessageWindowComponent } from "projects/design-lib/src/lib/components/message-window/message-window.component";
import { ConfirmBoxComponent } from "projects/design-lib/src/lib/components/confirm-box/confirm-box.component";
import { ImportModel } from "../../models/import-model.model";
import { Message } from "projects/design-lib/src/lib/models/message.model";
import { ResponseNotification } from "projects/design-lib/src/lib/models/response-notification";
import { Property } from "../../models/property.model";
import { MessageType } from "projects/design-lib/src/lib/models/message-type.model";
import { FunctionsService } from "projects/design-lib/src/lib/services/functions.service";
import { ImportModelControllerService } from "../import-model-controller.service";
@Component({
  selector: "lib-data-importing",
  templateUrl: "./data-importing.component.html",
  styleUrls: ["./data-importing.component.scss"],
})
export class DataImportingComponent implements OnInit, OnDestroy {
  constructor(
    protected service: ImportModelCrudApiService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected frameworkService: FrameworkService,
    protected importModelControllerService: ImportModelControllerService,
    private cdRef: ChangeDetectorRef
  ) {}

  importModel: ImportModel;
  @ViewChild("messageWindow", { static: true })
  messageWindow: MessageWindowComponent;
  @ViewChild("confirmBox", { static: true }) confirmBox: ConfirmBoxComponent;

  private _properties: Property[] = [];

  async ngOnInit() {
    const id: number = this.route.snapshot.params["id"];
    console.log(id);
    if (id != null) {
      this.service.findById(id.toString()).subscribe((x: ImportModel) => {
        this.importModel = x;
        this._properties = x.mappings.map((x) => x.property);
        if (this.importModelControllerService.complementFieldId != null) {
          this.importModel.complementFieldId = this.importModelControllerService.complementFieldId;
          this.importModel.complementFieldText = this.importModelControllerService.complementFieldText;
          this.importModel.complementFieldLabel = this.importModelControllerService.complementFieldLabel;
          this.importModel.complementFieldName = this.importModelControllerService.complementFieldName;
          this.importModel.complementFieldValue = this.importModelControllerService.complementFieldValue;
        }
      });
    }
    this.titleImport = this.frameworkService.utils.findTextTranslated("TITLE_IMPORT");
  }

  ngOnDestroy() {
    this.importModelControllerService.clear();
  }

  private file: any;
  processedData: any[];
  progressImport: number = 0;
  titleImport: string = "Importação de dados";

  processData() {
    this.service
      .processData(this.file, this.importModel.id)
      .subscribe((responseAPI: ResponseNotification<any>) => {
        this.messageWindow.showTitle(
          responseAPI.messages,
          '',
          this.titleImport
        );
        this.processedData = responseAPI.data;
        this.cdRef.detectChanges();
      });
  }

  import() {
    const totalItems = this.processedData.length;
    const batchSize = 100;
    const totalBatches = Math.ceil(totalItems / batchSize);

    let completedBatches = 0;
    this.progressImport = 0;
    let messages: Message[] = [];

    const sendBatch = (batchIndex: number) => {
      const start = batchIndex * batchSize;
      const end = start + batchSize;
      const batchData = this.processedData.slice(start, end);

      const request = {
        operation: this.importModel.operation,
        data: batchData,
        keys: this.importModel.entity.properties
        .filter((x) => x.searchKey === true)
        .map(
          (x) => `${this.importModel.entity.internalName}.${x.internalName}`
        ),
        groupFieldDefinitionId: this.importModel.groupFieldDefinitionId,
        complementFieldId: this.importModel.complementFieldId,
        complementFieldText: this.importModel.complementFieldText,
        complementFieldName: this.importModel.complementFieldName,
        complementFieldLabel: this.importModel.complementFieldLabel,
        complementFieldValue: this.importModel.complementFieldValue,
      };

      this.frameworkService.utils.http.post(this.importModel.entity.accessLocation, request).subscribe(
        (responseAPI: ResponseNotification<any>) => {
          completedBatches++;
          this.progressImport = Math.round(
            (completedBatches / totalBatches) * 100
          );

          // Acumula mensagens a cada resposta
          messages.push(
            ...FunctionsService.removeDuplicatesAndModifyDescription(responseAPI.messages)
          );

          this.cdRef.detectChanges();

          if (completedBatches === totalBatches) {
            // Todas as requisições concluídas
            this.messageWindow.showTitle(
              messages,
              FunctionsService.hasErrors(messages) ? "" : "/import-models",
              this.titleImport
            );
          } else {
            sendBatch(batchIndex + 1);
          }
        },
        (error) => {
          completedBatches++;
          messages.push({
            code: "error",
            description: "Erro durante a importação: " + error.message,
            type: MessageType.Error,
          });

          this.cdRef.detectChanges();

          if (completedBatches === totalBatches) {
            this.messageWindow.showTitle(messages, null, this.titleImport);
          } else {
            sendBatch(batchIndex + 1);
          }
        }
      );
    };
    sendBatch(0);
  }

  onUpload(event) {
    if (event.files && event.files[0]) {
      this.file = event.files[0];
      this.processData();
    }
  }
  goList() {
    this.frameworkService.location.back();
  }

  cancel() {
    this.processedData = [];
  }

  edit() {
    this.router.navigate(['/import-models/', this.importModel.id]);
  }
}
