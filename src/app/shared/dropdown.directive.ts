import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

/*Here we add a decoractor tp convert this class in a directive. I also add a selector to use it in the html */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[appDropdown]',
})

// tslint:disable-next-line:directive-class-suffix
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;
    // tslint:disable-next-line:typedef
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
      this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }
    constructor(private elRef: ElementRef) {}

}
