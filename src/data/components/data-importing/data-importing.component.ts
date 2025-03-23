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

  ngOnInit(): void {
    if (!environment.production) {
      console.log("KKK");
    }
    const id: number = this.route.snapshot.params["id"];
    if (id != null) {
      this.service.findById(id.toString()).subscribe((x: ImportModel) => {
        console.log(x);
        this.importModel = x;
        this._properties = x.mappings.map((x) => x.property);
      });
    }
  }
  private file: any;
  processedDataTreeNode!: TreeNode[];
  processedData: any[];
  progressImport: number = 0;

  processData() {
    this.service
      .processData(this.file, this.importModel.id)
      .subscribe((responseAPI: ResponseNotification<any>) => {
        this.messageWindow.showTitle(
          responseAPI.messages,
          null,
          "Importação de dados"
        );
        this.processedData = responseAPI.data;
        this.processedDataTreeNode = this.buildTreeNodes(responseAPI.data);
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
    const batchSize = 100; // ajuste este valor conforme desejado
    const totalBatches = Math.ceil(totalItems / batchSize);

    let completedBatches = 0;
    this.progressImport = 0;

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
          this.cdRef.detectChanges();
          if (completedBatches === totalBatches) {
            this.messageWindow.showTitle(
              this.removeDuplicatesAndModifyDescription(responseAPI.messages),
              !FunctionsService.hasErrors(responseAPI.messages)
                ? "/import-models"
                : null,
              "Importação de dados"
            );
          } else {
            sendBatch(batchIndex + 1);
          }
        },
        (error) => {
          this.messageWindow.showTitle(
            [
              {
                code: "error",
                description: "Erro durante a importação.",
                type: MessageType.Error,
              },
            ],
            null,
            error
          );
          this.cdRef.detectChanges();
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
    this.processedDataTreeNode = [];
  }

  buildTreeNodes(data: any[]): TreeNode[] {
    return data.map((item) => {
      const node: TreeNode = {
        label: "",
        children: [],
      };

      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          const value = item[key];

          if (Array.isArray(value)) {
            const childNode: TreeNode = {
              label:
                this._properties.find((x) => x.internalName == key)
                  ?.propertyName[this.frameworkService.language] || key,
              children: this.buildArrayNodes(value),
            };
            node.children.push(childNode);
          } else if (typeof value === "object" && value !== null) {
            const childNode: TreeNode = {
              label: this.extractLabel(key, value),
              children: this.buildTreeNodes([value]),
            };
            node.children.push(childNode);
          } else if (value !== null) {
            node.label += `${
              this._properties.find((x) => x.internalName == key)?.propertyName[
                this.frameworkService.language
              ] || key
            }: ${this.formatValue(value)}  |  `;
          }
        }
      }

      return node;
    });
  }

  buildArrayNodes(array: any[]): TreeNode[] {
    return array.map((item, index) => {
      const node: TreeNode = {
        label: `Item ${index + 1}`,
        children: this.buildTreeNodes([item]),
      };
      return node;
    });
  }

  extractLabel(key: string, obj: any): string {
    let label = "";
    for (const prop in obj) {
      if (
        obj.hasOwnProperty(prop) &&
        obj[prop] !== null &&
        !Array.isArray(obj[prop])
      ) {
        label += `${this.frameworkService.utils.getTextTranslated(
          prop
        )}: ${this.formatValue(obj[prop])}  |  `;
      }
    }
    return `${key}: ${label.trim()}  |  `;
  }

  formatValue(value: any): string {
    if (
      typeof value === "string" &&
      value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)
    ) {
      const date = new Date(value);
      return date.toLocaleDateString("en-GB"); // Formato DD/MM/YYYY
    }
    return value;
  }

  removeDuplicatesAndModifyDescription(messages: Message[]): Message[] {
    // Usando um mapa para manter controle das mensagens únicas
    const uniqueMessagesMap = new Map<string, number>();
    const uniqueMessages: Message[] = [];

    // Contagem das mensagens repetidas
    const duplicateCounts: { [key: string]: number } = {};

    messages.forEach((message) => {
      // Incrementando a contagem das mensagens repetidas
      if (duplicateCounts[message.code]) {
        duplicateCounts[message.code]++;
      } else {
        duplicateCounts[message.code] = 1;
      }

      // Adicionando a mensagem única ao mapa
      if (!uniqueMessagesMap.has(message.code)) {
        uniqueMessagesMap.set(message.code, uniqueMessages.length);
        uniqueMessages.push(message);
      }
    });

    // Modificando as descrições das mensagens únicas
    uniqueMessages.forEach((message) => {
      const count = duplicateCounts[message.code];
      if (count > 1) {
        message.description += ` (Total: ${count})`;
      }
    });

    return uniqueMessages;
  }
}
