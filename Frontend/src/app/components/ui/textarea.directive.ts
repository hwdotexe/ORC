import { Directive, ElementRef, HostBinding, Input, OnInit } from "@angular/core";

@Directive({
    selector: 'textarea[styled]'
})
export class TextareaDirective {
    constructor(private element: ElementRef) {}

    @HostBinding() get class() {
        return "p-1 px-3 w-full h-32 rounded-md border border-gray-200 m-1 focus:outline-none focus:ring focus:ring-indigo-400";
    }
}