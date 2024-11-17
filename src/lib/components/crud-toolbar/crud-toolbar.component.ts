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
  clickDelete() {
    this.onClickDelete.emit();
  }
  clickSave() {
    this.onClickSave.emit();
  }
}
