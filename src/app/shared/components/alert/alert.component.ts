import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Input() data: AlertData | undefined;
  tcolor: string = 'black';

  constructor() {}

  ngOnInit(): void {
    if (this.data) {
      switch (this.data.type.toLocaleLowerCase()) {
        case 'success':
          this.tcolor = '#4cbb17';
          break;
        case 'error':
          this.tcolor = 'red';
          break;
        case 'loading':
        case 'info':
          this.tcolor = 'blue';
          break;
      }
    }
  }
}

export type AlertData = {
  type: string | undefined;
  message: string | undefined;
};
