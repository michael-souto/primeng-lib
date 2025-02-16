import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FrameworkService } from 'projects/design-lib/src/lib/services/framework.service';

@Component({
  selector: 'd-crud-toolbar',
  templateUrl: './crud-toolbar.component.html',
  styleUrls: ['./crud-toolbar.component.scss'],
})
export class CrudToolbarComponent {
  constructor(public framework: FrameworkService) {}

  @Input() updateMode: boolean;
  @Input() disabledSave: boolean;

  @Output() onClickDelete = new EventEmitter();
  @Output() onClickSave = new EventEmitter();
  @Output() onClickBack = new EventEmitter();

  clickBack() {
    this.onClickBack.emit();
  }
  hasBackEvent() : boolean{
    return this.onClickBack.observed;
  }
  clickDelete() {
    this.onClickDelete.emit();
  }
  hasDeleteEvent() : boolean{
    return this.onClickDelete.observed;
  }
  clickSave() {
    this.onClickSave.emit();
  }
  hasSaveEvent() : boolean{
    return this.onClickSave.observed;
  }
}
