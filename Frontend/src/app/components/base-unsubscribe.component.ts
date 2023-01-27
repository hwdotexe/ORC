import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: ``
})
export class BaseUnsubscribeComponent implements OnDestroy {
  unsubscribe$ = new Subject();

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
  }
}
