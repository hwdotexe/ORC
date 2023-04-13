import { Component, OnInit } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ui-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.css']
})
export class ToastNotificationComponent extends Toast implements OnInit {
  toastType: string;

  constructor(protected toastrService: ToastrService, public toastPackage: ToastPackage) {
    super(toastrService, toastPackage);
  }

  ngOnInit(): void {
    this.toastType = this.toastPackage.toastType;
  }

  action(event: Event) {
    event.stopPropagation();
    this.toastrService.clear(this.toastPackage.toastId);
    this.toastPackage.triggerTap();

    return false;
  }
}
