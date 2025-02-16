import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'd-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent {

  constructor() { }

@Input() value: any;
  @Output() valueChange = new EventEmitter<any>();
  @Input() label: string;
  @Input() id: string;
  @Input() disabled: boolean;
  @Input() required: boolean;
  @Input() invalidCondition: boolean;
  @Input() invalidMessage: string;


  onValueChange(newValue: any) {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }

}
