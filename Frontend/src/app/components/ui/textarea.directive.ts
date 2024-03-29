import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: 'textarea[styled]'
})
export class TextareaDirective {
  constructor(private element: ElementRef) {}

  @HostBinding() get class() {
    return 'py-2 px-3 w-full min-h-[24rem] rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-[#39A0ED]';
  }
}
