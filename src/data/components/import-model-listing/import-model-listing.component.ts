import { Component, OnInit } from '@angular/core';
import { ListRegisterComponent } from 'projects/design-lib/src/lib/components/list-register/list-register.component';
import { ImportModelCrudApiService } from '../../services/import-model-crud-api.service';
import { FrameworkService } from 'projects/design-lib/src/lib/services/framework.service';
import { ImportModel } from '../../models/import-model.model';
import { ImportModelsControllerService } from '../../services/import-models-controller.service';
import { EventBusService } from 'projects/design-lib/src/lib/services/event-bus.service';
@Component({
  selector: 'lib-import-model-listing',
  templateUrl: './import-model-listing.component.html',
  styleUrls: ['./import-model-listing.component.scss'],
})
export class ImportModelListingComponent extends ListRegisterComponent<ImportModel> implements OnInit {

  constructor(
    protected override service: ImportModelCrudApiService,
    protected override controller: ImportModelsControllerService,
    public override framework: FrameworkService,
    private eventBusService: EventBusService
  ) {
    super(service, controller, framework);
  }

  ngOnInit() {
    this.eventBusService.emit({
      type: "import-model:listing",
      callback: () => {
        this.new();
      },
    });
  }

  override getRouterLink(): string {
    return 'import-models';
  }

  import(id: string) {
    this.framework.router.navigate(['/import-models', id, 'import']);
  }
}
