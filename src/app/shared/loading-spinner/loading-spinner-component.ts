import { Component } from '@angular/core';
/*His is a templete used to display de spinner icon*/
@Component({
  selector: 'app-loading-spinner',
  template:
    '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./loading-spinner.component.css'],
})
export class LoadingSpinnerComponent {}
