import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'r-sidebar',
  templateUrl: './responsive-sidebar.component.html',
  styleUrls: ['./responsive-sidebar.component.scss']
})
export class ResponsiveSidebarComponent implements OnInit {

  constructor() {}

  @Input() visible: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() modal: boolean = true;
  @Input() full: boolean = false;
  @Input() position: string = 'right';
  @Input() header: string = '';
  @Input() isMobile: boolean = false;

  ngOnInit(): void {
    if (this.isMobile){
      this.full = true;
    }
  }

  hide(){
    this.visibleChange.emit(false);
  }
}
