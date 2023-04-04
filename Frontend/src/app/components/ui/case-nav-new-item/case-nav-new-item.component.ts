import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-case-nav-new-item',
  templateUrl: './case-nav-new-item.component.html',
  styleUrls: ['./case-nav-new-item.component.css']
})
export class CaseNavNewItemComponent implements OnInit {
  @Input() label: string;
  @ViewChild('input') input: ElementRef;
  @Output() onSubmit = new EventEmitter<string>();

  isTyping: boolean;

  constructor() {}

  ngOnInit(): void {}

  checkCanSubmit(event: any) {
    if (this.isTyping && event?.key === 'Enter') {
      this.submit();
    }
  }

  handleInput(event: any) {
    if (event?.target?.value?.length > 0) {
      this.isTyping = true;
    } else {
      this.isTyping = false;
    }
  }

  submit(): void {
    if (this.isTyping) {
      this.onSubmit.emit(this.input.nativeElement.value);

      this.input.nativeElement.value = '';
      this.input.nativeElement.blur();
      this.isTyping = false;
    }
  }
}
