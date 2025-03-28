import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { ImportModelCrudApiService } from "../../services/import-model-crud-api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FrameworkService } from "projects/design-lib/src/lib/services/framework.service";
import { MessageWindowComponent } from "projects/design-lib/src/lib/components/message-window/message-window.component";
import { ConfirmBoxComponent } from "projects/design-lib/src/lib/components/confirm-box/confirm-box.component";
import { ImportModel } from "../../models/import-model.model";
import { TreeNode } from "primeng/api";
import { Message } from "projects/design-lib/src/lib/models/message.model";
import { ResponseNotification } from "projects/design-lib/src/lib/models/response-notification";
import { environment } from "src/environments/environment";
import { Property } from "../../models/property.model";
import { MessageType } from "projects/design-lib/src/lib/models/message-type.model";
import { FunctionsService } from "projects/design-lib/src/lib/services/functions.service";
@Component({
  selector: "lib-data-importing",
  templateUrl: "./data-importing.component.html",
  styleUrls: ["./data-importing.component.scss"],
})
export class DataImportingComponent implements OnInit {
  constructor(
    protected service: ImportModelCrudApiService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected frameworkService: FrameworkService,
    private cdRef: ChangeDetectorRef
  ) {}

  importModel: ImportModel;
  @ViewChild("messageWindow", { static: true })
  messageWindow: MessageWindowComponent;
  @ViewChild("confirmBox", { static: true }) confirmBox: ConfirmBoxComponent;

  private _properties: Property[] = [];

  async ngOnInit() {
    const id: number = this.route.snapshot.params["id"];
    if (id != null) {
      this.service.findById(id.toString()).subscribe((x: ImportModel) => {
        console.log(x);
        this.importModel = x;
        this._properties = x.mappings.map((x) => x.property);
      });
    }
    this.titleImport = this.frameworkService.utils.findTextTranslated("TITLE_IMPORT");
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
    const url = this.importModel.entity.accessLocation;
    const keys = this.importModel.mappings
      .filter((x) => x.property.searchKey === true)
      .map(
        (x) => `${x.property.entity.internalName}.${x.property.internalName}`
      );

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
        keys,
      };

      this.frameworkService.utils.http.post(url, request).subscribe(
        (responseAPI: ResponseNotification<any>) => {
          completedBatches++;
          this.progressImport = Math.round(
            (completedBatches / totalBatches) * 100
          );

          // Acumula mensagens a cada resposta
          messages.push(
            ...this.removeDuplicatesAndModifyDescription(responseAPI.messages)
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

  removeDuplicatesAndModifyDescription(messages: Message[]): Message[] {
    // Usando um mapa para manter controle das mensagens únicas
    const uniqueMessagesMap = new Map<string, number>();
    const uniqueMessages: Message[] = [];

    // Contagem das mensagens repetidas
    const duplicateCounts: { [key: string]: number } = {};

    messages.forEach((message) => {
      // Incrementando a contagem das mensagens repetidas
      if (duplicateCounts[message.description]) {
        duplicateCounts[message.description]++;
      } else {
        duplicateCounts[message.description] = 1;
      }

      // Adicionando a mensagem única ao mapa
      if (!uniqueMessagesMap.has(message.description)) {
        uniqueMessagesMap.set(message.description, uniqueMessages.length);
        uniqueMessages.push(message);
      }
    });

    // Modificando as descrições das mensagens únicas
    uniqueMessages.forEach((message) => {
      const count = duplicateCounts[message.description];
      if (count > 1) {
        message.description += ` (Total: ${count})`;
      }
    });

    return uniqueMessages;
  }
}
