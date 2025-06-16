import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FrameworkService } from 'projects/design-lib/src/lib/services/framework.service';
import { UtilsService } from 'projects/design-lib/src/lib/services/utils/utils.service';

@Component({
  selector: 'd-input-calendar',
  templateUrl: './input-calendar.component.html',
  styleUrls: ['./input-calendar.component.scss'],
})
export class InputCalendarComponent implements OnInit {

  constructor(private utilsService: UtilsService, private framework: FrameworkService) {
    this.utilsService.getTextTranslated('THIS_FIELD_REQUIRED').then(text => {
      this.messageRequired = text;
    });
  }

  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();
  @Input() label: string;
  @Input() id: string;
  @Input() disabled: boolean;
  @Input() invalidCondition: boolean;
  @Input() invalidMessage: string;
  @Input() placeholder: string;
  @Input() dateFormat: string = this.framework.defaultsComponentDateFormat;
  @Input() required?: boolean = null;
  @Input() submitted?: boolean = null;
  messageRequired: string;

  ngOnInit(): void {
    if (this.value) {
      this.value = new Date(this.value);
    }
  }

  onValueChange(newValue: any) {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }

  isEmpty() {
    return this.value === null || this.value === undefined || this.value === '';
  }

  isRequired() {
    return this.required == true || this.required?.toString() == 'true';
  }

  isNullRequired() {
    return !this.required;
  }

  isSubmitted() {
    return this.submitted === true || this.submitted?.toString() == 'true';
  }

  isNullSubmitted() {
    return this.submitted === null;
  }

}
