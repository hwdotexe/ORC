import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: 'select[styled]',
})
export class SelectDirective {
  constructor(private element: ElementRef) {}

  @HostBinding() get class() {
    return "py-1.5 px-3 pr-5 rounded-md border border-gray-200 m-1 bg-white focus:outline-none focus:ring focus:ring-indigo-400";
  }
}
