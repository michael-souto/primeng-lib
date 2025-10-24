import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ContentChild, TemplateRef
} from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { SearchService } from 'projects/design-lib/src/lib/services/search.service';
import { SearchField } from 'projects/design-lib/src/lib/models/search-field';
import { SearchResponseApi } from 'projects/design-lib/src/lib/models/search-response-api';
import { FrameworkService } from 'projects/design-lib/src/lib/services/framework.service';
import { SearchFilter } from 'projects/design-lib/src/lib/models/search-filter';

import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'd-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.scss'],
})
export class SearchScreenComponent implements OnInit, OnDestroy {

  constructor(
    protected service: SearchService,
    public framework: FrameworkService,
  ) {
    this.searchSubject
      .pipe(
        debounceTime(500),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.searchScreen();
      });
  }

  @Input() title: string;
  @Input() mode: 'single' | 'multiple' | 'search' = 'search';
  @Input() rows: number = 8;
  @Input() searchId: string;
  @Input() apiName: string;
  @Input() serverUrl: string = environment.apiURLGateway;


  pageNumber: number = 0;
  totalRecords: number = 0;
  labelFilter = 'Filtragem';
  @ContentChild('contentGridTemplate') contentGridTemplate: TemplateRef<any>;

  // Filter of Search
  private searchSubject = new Subject<void>();
  private destroy$ = new Subject<void>();

  @Input() searchFieldsConditions: SearchFilter[];

  // Mode Single or Multiple
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();
  @Input() fieldDescription = 'name';
  labelConfirm = 'Confirmar';
  @Input() showConfirmButton: boolean = true;
  @Input() showNewButton: boolean = true;
  @Input() showBackButton: boolean = true;
  @Input() showFilter: boolean = true;
  @Input() rowHeight: number = 50;
  @Output() afterSearch = new EventEmitter<SearchResponseApi>();
  // Mode Search
  @Output() onNewClick = new EventEmitter<any>();
  labelNew: string = 'Novo'

  // Internals properties
  listSearch: any[];
  @Output() onConfirm = new EventEmitter<any>();
  columnsGrid: SearchField[];
  filters: SearchFilter[];

  getTotalPages(): number {
    return Math.ceil(this.totalRecords / this.rows);
  }

  ngOnInit() {
    if (this.mode == 'multiple') {
      this.value = this.value ?? [];
    } else if (this.mode == 'single'){
      this.value = this.value ?? {};
    }
    this.callEventBus();

    this.rows = Math.floor(this.framework.utils.SCREEN_HEIGHT / this.rowHeight);

    this.service.getColumns(this.serverUrl + '/' + this.apiName, this.searchId).subscribe(
      (searchResponseApi: SearchResponseApi) => {
        if (this.title == null) {
          this.title = searchResponseApi.title;
        }

        this.columnsGrid = searchResponseApi['columns'].filter(
          (x) => x.type != 'hidden' && x.type != 'guid'
        );

        this.filters = this.columnsGrid
          .filter(
            (x) =>
              x.type != 'list' &&
              x.type != 'listcurrency' &&
              x.type != 'listdate' &&
              x.type != 'listnumber' &&
              x.type != 'entity'
          )
          .map((x) =>
            new SearchFilter().setProperties(x.label, x.field, x.type, null)
          );
        this.search(this.getFieldsSearch(), this.pageNumber, this.rows);
      },
      (response: HttpErrorResponse) => {
        alert(response.error.messages);
      }
    );
  }

  callEventBus() {
    if (this.mode == 'multiple') {
      this.framework.eventBusService.emit({
        type: 'search-screen:multiple',
        payload: this.value,
        callback: () => this.ok(),
        valid: () => this.isValid()
      });
    } else if (this.mode == 'single'){
      this.framework.eventBusService.emit({
        type: 'search-screen:single',
        payload: this.value,
        callback: () => this.ok(),
        valid: () => this.isValid()
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFilterChange() {
    this.pageNumber = 0;
    this.searchSubject.next();
  }
  searchScreen() {
    this.search(this.getFieldsSearch(), this.pageNumber, this.rows);
  }

  getFieldsSearch(): Array<SearchFilter> {
    let fields: Array<SearchFilter> = new Array<SearchFilter>();
    fields.push(...this.filters.filter(x=> x.value));

    if (
      this.searchFieldsConditions != null &&
      this.searchFieldsConditions.length > 0
    ) {
      this.searchFieldsConditions.forEach((element) => {
        fields.push(element);
      });
    }
    return fields;
  }

  nextPage() {
    this.pageNumber = this.pageNumber + 1;
    this.search(this.getFieldsSearch(), this.pageNumber, this.rows);
  }

  previosPage() {
    this.pageNumber = this.pageNumber - 1;
    this.search(this.getFieldsSearch(), this.pageNumber, this.rows);
  }

  isPreviosPage(): boolean {
    return this.pageNumber == 0;
  }

  isNextPage(): boolean {
    return this.listSearch == null || this.listSearch.length < this.rows;
  }

  search(fields: Array<SearchFilter>, page: number, size: number) {
    this.service
      .searchPaged(this.serverUrl + '/' + this.apiName, this.searchId, fields, page, size)
      .subscribe((searchResponseApi: SearchResponseApi) => {
        this.totalRecords = searchResponseApi['data']['totalElements'];
        if (this.totalRecords > 0) {
          this.listSearch = searchResponseApi['data']['content'];
        } else {
          this.listSearch = [];
        }
        if (this.afterSearch) {
          this.afterSearch.emit(searchResponseApi);
        }
        this.onAfterSearch(searchResponseApi);
      });
  }

  onAfterSearch(searchResponseApi: SearchResponseApi): void {
  }

  get hasCustomBody(): boolean {
    return !!this.contentGridTemplate;
  }

  isDate(type: string): boolean {
    return ['date', 'listdate', 'rangedate'].includes(type);
  }

  isCurrency(type: string): boolean {
    return ['currency', 'listcurrency'].includes(type);
  }

  isSimpleType(type: string): boolean {
    return ['guid', 'string', 'number', 'list', 'listnumber'].includes(type);
  }

  select(object: any) {
    if (this.mode == 'single') {
      this.columnsGrid.forEach(column => {
        if (column.type == 'list') {
          this.value[column.field] = [];
        }
        this.value = object;
      });
    } else if (this.mode == 'multiple') {
      //
    } else if (this.mode == 'search') {
      this.onConfirm.emit(this.value);
    }
    this.callEventBus();
  }

  unSelect(object: any) {
    this.value = this.value?.filter((x) => x.id != object.id);
  }

  getListValuesSplit(value: string): string[] {
    return value.split(';');
  }

  removeValue(item: any) {
    this.value = this.value.filter((x) => x.id != item.id);
  }

  getDescriptionObject() {
    return this.value ? this.value[this.fieldDescription] : '';
  }

  back() {
    this.framework.utils.backMyBaseRoute();
  }

  isValid() {
    if (this.value == null) {
      return false;
    }
    if (Array.isArray(this.value)) {
      return this.value.length > 0;
    }
    if (typeof this.value === 'object' && this.value !== null) {
      return this.value.id != null;
    }
    return false;
  }

  ok() {
    this.onConfirm.emit(this.value);
  }

}
