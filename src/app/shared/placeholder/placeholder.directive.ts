import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholer]',
})
export class PlaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
