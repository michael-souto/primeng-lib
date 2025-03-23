import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportModelRegisterComponent } from './components/import-model-register/import-model-register.component';
import { DataImportingComponent } from './components/data-importing/data-importing.component';
import { ImportModelListingComponent } from './components/import-model-listing/import-model-listing.component';
import { MappingImportModelRegisterComponent } from './components/import-model-register/mapping-import-model-register/mapping-import-model-register.component';
import { PendingChangesGuard } from 'projects/design-lib/src/lib/services/guards/can-component-deactivate';

const routes: Routes = [
  {
    path: '',
    component: ImportModelListingComponent
  },
  {
    path: 'create',
    canDeactivate: [PendingChangesGuard],
    data: { breadcrumb: 'Novo modelo de importação' },
    component: ImportModelRegisterComponent
  },
  {
    path: 'create/mappings',
    data: { breadcrumb: 'Mapeamento de campos' },
    component: MappingImportModelRegisterComponent
  },
  {
    path: ':id',
    canDeactivate: [PendingChangesGuard],
    data: { breadcrumb: 'Modelo de importação' },
    component: ImportModelRegisterComponent
  },
  {
    path: ':id/mappings',
    data: { breadcrumb: 'Mapeamento de campos' },
    component: MappingImportModelRegisterComponent
  },
  {
    path: ':id/import',
    data: { breadcrumb: 'Importar' },
    component: DataImportingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }
