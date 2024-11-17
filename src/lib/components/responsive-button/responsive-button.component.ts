import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'r-button',
  templateUrl: './responsive-button.component.html',
  styleUrls: ['./responsive-button.component.scss'],
})
export class ResponsiveButtonComponent implements OnInit {
  constructor() {}

  @Input() label: string;
  @Input() icon: string;
  @Input() color: string;
  @Input() rounded: boolean = false;
  @Input() raised: boolean = false;
  @Input() text: boolean = false;
  @Input() outlined: boolean = false;
  @Input() plain: boolean = false;
  @Input() isMobile: boolean = false;

  @Input() disabled: boolean = false;
  @Input() visible: boolean = true;
  @Input() width: string = '30px';
  @Input() heigth: string = '30px';
  @Input() tooltip: string = '';
  @Input() tooltipPosition: string = 'top';
  @Input() isProcessing: boolean | undefined = undefined;

  @Output() onClick = new EventEmitter<any>();

  ngOnInit(): void {}

  clickButton() {
    this.onClick.emit();
  }
}
