import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageLoadingService {
  showLoadingIcon$: BehaviorSubject<boolean>;

  constructor() {
    this.showLoadingIcon$ = new BehaviorSubject<boolean>(false);
  }

  loading() {
    this.showLoadingIcon$.next(true);
  }

  clear() {
    this.showLoadingIcon$.next(false);
  }
}
