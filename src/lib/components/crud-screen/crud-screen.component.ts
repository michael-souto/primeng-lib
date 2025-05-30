import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from "@angular/core";
import { RegisterComponent } from "projects/design-lib/src/lib/components/register/register.component";
import { ResponseNotification } from "projects/design-lib/src/lib/models/response-notification";

@Component({
  selector: "d-crud-screen",
  templateUrl: "./crud-screen.component.html",
  styleUrls: ["./crud-screen.component.css"],
})
export class CrudScreenComponent<T> extends RegisterComponent<T> implements OnInit {
  @Input() override service: any;
  @Input() override validator: any;
  @Input() override controller: any;
  @Input() override framework: any;
  @Input() override activateRoute: any;
  @Input() override nameParamId: string = "id";
  @Input() title: string;
  @Input() description: string;
  @Input() entityName: string;
  @Input() baseRouterLink: string;
  @Input() showCrudToolbar: boolean = true;

  @Output() onBeforeInitRegister = new EventEmitter<void>();
  @Output() onAfterInitRegister = new EventEmitter<any>();
  @Output() onBeforeSave = new EventEmitter<void>();
  @Output() onAfterSave = new EventEmitter<void>();
  @Output() onBeforeDelete = new EventEmitter<void>();
  @Output() onAfterDelete = new EventEmitter<void>();
  @Output() onAfterSaveSucess = new EventEmitter<ResponseNotification<any>>();
  @Output() onAfterSaveError = new EventEmitter<ResponseNotification<any>>();
  @Output() onAfterDeleteSucess = new EventEmitter<ResponseNotification<any>>();
  @Output() onAfterDeleteError = new EventEmitter<ResponseNotification<any>>();
  @Output() onBeforeInitializeEntity = new EventEmitter<T>();
  @ContentChild('contentTemplate') contentTemplate: TemplateRef<any>;

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override getRouterLink(): string {
    return this.baseRouterLink;
  }

  override beforeInitRegister() {
    if (this.onBeforeInitRegister) {
      this.onBeforeInitRegister.emit();
    }
  }

  override beforeInitializeEntity(entity: T) {
    if (this.onBeforeInitializeEntity) {
      this.onBeforeInitializeEntity.emit(entity);
    }
  }

  override afterInitRegister(id: any) {
    if (this.onAfterInitRegister) {
      this.onAfterInitRegister.emit(id);
    }
  }

  override beforeSave() {
    if (this.onBeforeSave) {
      this.onBeforeSave.emit();
    }
  }

  override afterSave() {
    if (this.onAfterSave) {
      this.onAfterSave.emit();
    }
  }

  override afterSaveSucess(responseApi: ResponseNotification<any>) {
    if (this.onAfterSaveSucess) {
      this.onAfterSaveSucess.emit(responseApi);
    }
  }

  override afterSaveError(responseApi: ResponseNotification<any>) {
    if (this.onAfterSaveError) {
      this.onAfterSaveError.emit(responseApi);
    }
  }

  override afterDeleteSucess(responseApi: ResponseNotification<any>) {
    if (this.onAfterDeleteSucess) {
      this.onAfterDeleteSucess.emit(responseApi);
    }
  }

  override afterDeleteError(responseApi: ResponseNotification<any>) {
    if (this.onAfterDeleteError) {
      this.onAfterDeleteError.emit(responseApi);
    }
  }

}
