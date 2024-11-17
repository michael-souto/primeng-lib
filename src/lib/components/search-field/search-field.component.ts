import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  @Input() multiple: boolean;
  @Input() dropdown: boolean;
  @Output() onSelectEntity = new EventEmitter<any>();
  @Input() title: string;
  @Input() invalidCondition: boolean;
  @Input() invalidMessage: string;
  @Input() activateRoute: ActivatedRoute;
  @Input() searchRoute: string;

  listSearch: any[];

  @Input() searchId: string;
  @Input() apiName: string;
  @Input() serverUrl: string = environment.apiURLGateway;

  search(event) {
    let fields: Array<SearchFilter> = new Array<SearchFilter>();
    let searchFieldComplete = new SearchFilter();
    searchFieldComplete.field = this.fieldDescription;
    searchFieldComplete.value = event.query;
    fields.push(searchFieldComplete);
    this.service
      .search(this.serverUrl + '/' + this.apiName, this.searchId, fields)
      .subscribe((searchResponseApi: SearchResponseApi) => {
        this.listSearch = searchResponseApi['data']['content'];
      });
  }

  clearValue() {
    this.valueChange.emit(this.value);
  }

  selectEntity(event) {
    this.valueChange.emit(this.value);
    if (this.onSelectEntity.observers.length > 0) {
      this.onSelectEntity.emit(event.value);
    }
  }

  goToSearchScreen() {
    this.framework.router.navigate([this.searchRoute], {
      relativeTo: this.activateRoute,
    });
  }
}