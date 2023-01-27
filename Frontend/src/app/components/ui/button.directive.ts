import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: 'button[styled-simple]'
})
export class ButtonDirectiveSimple {
  constructor(private element: ElementRef) {}

  @HostBinding() get class() {
    return 'py-2 px-3 text-sm rounded-sm bg-white text-gray-700 font-semibold shadow-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-500';
  }
}

@Directive({
  selector: 'button[styled-blue]'
})
export class ButtonDirectiveBlue {
  constructor(private element: ElementRef) {}

  @HostBinding() get class() {
    return 'p-1 px-5 pb-2 rounded-sm bg-blue-500 text-gray-100 font-semibold shadow-md hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300';
  }
}

@Directive({
  selector: 'button[styled-blue-disabled]'
})
export class ButtonDirectiveBlueDisabled {
  constructor(private element: ElementRef) {}

  @HostBinding() get class() {
    return 'p-1 px-5 pb-2 rounded-sm bg-blue-300 text-gray-100 font-semibold shadow-md';
  }
}

@Directive({
  selector: 'button[styled-red]'
})
export class ButtonDirectiveRed {
  constructor(private element: ElementRef) {}

  @HostBinding() get class() {
    return 'p-1 px-3 pb-2 rounded-sm bg-red-700 text-gray-100 font-semibold shadow-md hover:bg-red-900 focus:outline-none focus:ring focus:ring-red-300';
  }
}

@Directive({
  selector: 'button[styled-green]'
})
export class ButtonDirectiveGreen {
  constructor(private element: ElementRef) {}

  @HostBinding() get class() {
    return 'p-1 px-3 pb-2 rounded-sm bg-green-600 text-gray-100 font-semibold shadow-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300';
  }
}

@Directive({
  selector: 'button[styled-orange]'
})
export class ButtonDirectiveOrange {
  constructor(private element: ElementRef) {}

  @HostBinding() get class() {
    return 'p-1 px-5 pb-2 rounded-sm bg-orange-600 text-gray-100 font-semibold shadow-md hover:bg-orange-800 focus:outline-none focus:ring focus:ring-orange-300';
  }
}
