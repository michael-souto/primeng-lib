import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataRoutingModule } from './data-routing.module';
import { ImportModelListingComponent } from './components/import-model-listing/import-model-listing.component';
import { ImportModelRegisterComponent } from './components/import-model-register/import-model-register.component';
import { DataImportingComponent } from './components/data-importing/data-importing.component';
import { MappingImportModelRegisterComponent } from './components/import-model-register/mapping-import-model-register/mapping-import-model-register.component';
import { DesignLibModule } from 'projects/design-lib/src/public-api';
import { PrimengLibV17Module } from '../public-api';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ImportModelListingComponent,
    ImportModelRegisterComponent,
    MappingImportModelRegisterComponent,
    DataImportingComponent
  ],
  imports: [
    CommonModule,
    DataRoutingModule,
    DesignLibModule,
    PrimengLibV17Module,
    TranslateModule,
  ]
})
export class DataModule { }
