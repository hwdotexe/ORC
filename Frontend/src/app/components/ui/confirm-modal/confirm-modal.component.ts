import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfirmationModalData } from 'src/app/models/confirmation-modal-data.interface';
import { AppDetailsStateService } from 'src/app/store/app-details-state/app-details-state.service';

@Component({
  selector: 'ui-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  confirmationModalData$: BehaviorSubject<ConfirmationModalData>;

  constructor(private appDetailsStateService: AppDetailsStateService) {}

  ngOnInit(): void {
    this.confirmationModalData$ = this.appDetailsStateService.confirmationModalData$;
  }

  callback(func: Function) {
    func();
    this.close();
  }

  close() {
    this.confirmationModalData$.next(null);
  }
}
