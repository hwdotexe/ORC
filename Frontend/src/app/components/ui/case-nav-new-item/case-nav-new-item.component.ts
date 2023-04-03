import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-case-nav-new-item',
  templateUrl: './case-nav-new-item.component.html',
  styleUrls: ['./case-nav-new-item.component.css']
})
export class CaseNavNewItemComponent implements OnInit {
  @Input() label: string;
  @ViewChild('input') input: ElementRef;

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
      // TODO dispatch create folder call

      this.input.nativeElement.value = '';
      this.input.nativeElement.blur();
      this.isTyping = false;
    }
  }
}
