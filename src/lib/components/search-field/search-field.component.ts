import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchField } from 'projects/design-lib/src/lib/models/search-field';
import { SearchFilter } from 'projects/design-lib/src/lib/models/search-filter';
import { SearchResponseApi } from 'projects/design-lib/src/lib/models/search-response-api';
import { FrameworkService } from 'projects/design-lib/src/lib/services/framework.service';
import { SearchService } from 'projects/design-lib/src/lib/services/search.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'd-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
})
export class SearchFieldComponent implements OnInit {
  constructor(
    private service: SearchService,
    public framework: FrameworkService
  ) {}
  ngOnInit() {}

  @Input() label: string;
  @Input() required: boolean;
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();
  @Input() returnedField: string;
  @Input() fieldDescription: string = 'nome';
  @Input() disabled: boolean;
  @Input() readonly: boolean;
  @Input() multiple: boolean;
  @Input() dropdown: boolean;
  @Input() itemIcon: string;
  @Output() onSelectEntity = new EventEmitter<any>();
  @Output() onBeforeGoToSearchScreen = new EventEmitter<any>();
  @Output() onAfterGoToSearchScreen = new EventEmitter<any>();
  @Input() title: string;
  @Input() invalidCondition: boolean;
  @Input() invalidMessage: string;
  @Input() activateRoute: ActivatedRoute;
  @Input() searchRoute: string;
  @Input() group: boolean;
  @Input() groupIcon: string = 'fa fa-folder';
  @Input() groupLabel: string;
  listSearch: any[];

  @Input() searchId: string;
  @Input() apiName: string;
  @Input() serverUrl: string = environment.apiURLGateway;

  @Input() columnsGrid: SearchField[];
  @Input() paramsSearch: SearchFilter[];

  search(event) {
    if (this.readonly || this.disabled) {
      return;
    }
    let fields: Array<SearchFilter> = new Array<SearchFilter>();
    let searchFieldComplete = new SearchFilter();
    searchFieldComplete.field = this.fieldDescription;
    searchFieldComplete.value = event.query;
    fields.push(searchFieldComplete);

    if (this.paramsSearch) {
      this.paramsSearch.forEach(param => {
        fields.push(param);
      });
    }

    this.service
      .search(this.serverUrl + '/' + this.apiName, this.searchId, fields)
      .subscribe((searchResponseApi: SearchResponseApi) => {
        const dataContent = searchResponseApi['data']['content'];

        if (!this.group) {
          this.listSearch = dataContent;
        } else {
          const groupedData = {};
          dataContent.forEach(item => {
            const groupKey = item[this.groupLabel] || 'Sem grupo';
            if (!groupedData[groupKey]) {
              groupedData[groupKey] = {
                label: groupKey,
                value: groupKey,
                items: []
              };
            }
            groupedData[groupKey].items.push({
              label: item[this.fieldDescription],
              value: item
            });
          });
          this.listSearch = Object.values(groupedData);
        }
        this.columnsGrid = searchResponseApi['columns'];
      });
  }

  updateValue() {
    this.valueChange.emit(this.value);
  }

  clearValue() {
    this.valueChange.emit(null);
    this.onSelectEntity.emit(null);
  }

  selectEntity(event) {
    this.columnsGrid.forEach(column => {
      if (column.type == 'list') {
        this.value[column.field] = [];
      }
    });

    this.valueChange.emit(this.value);
    if (this.onSelectEntity.observers.length > 0) {
      this.onSelectEntity.emit(event.value);
    }
  }

  goToSearchScreen() {
    this.valueChange.emit(this.value);
    this.onBeforeGoToSearchScreen.emit();
    this.framework.router.navigate([this.searchRoute], {
      relativeTo: this.activateRoute,
    });
    this.onAfterGoToSearchScreen.emit();
  }
}
