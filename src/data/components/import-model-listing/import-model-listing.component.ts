import { Component, OnInit } from '@angular/core';
import { ListRegisterComponent } from 'projects/design-lib/src/lib/components/list-register/list-register.component';
import { ImportModelCrudApiService } from '../../services/import-model-crud-api.service';
import { FrameworkService } from 'projects/design-lib/src/lib/services/framework.service';
import { ImportModel } from '../../models/import-model.model';
import { ImportModelsControllerService } from '../../services/import-models-controller.service';
@Component({
  selector: 'lib-import-model-listing',
  templateUrl: './import-model-listing.component.html',
  styleUrls: ['./import-model-listing.component.scss'],
})
export class ImportModelListingComponent extends ListRegisterComponent<ImportModel> {

  constructor(
    protected override service: ImportModelCrudApiService,
    protected override controller: ImportModelsControllerService,
    public override framework: FrameworkService
  ) {
    super(service, controller, framework);
  }

  override getRouterLink(): string {
    return 'import-models';
  }

  import(id: string) {
    this.framework.router.navigate(['/import-models', id, 'import']);
  }
}
