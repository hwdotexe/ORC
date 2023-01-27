import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { AccountListResponse } from 'src/app/models/API/Response/account-list-response.interface';
import { AccountStatus } from 'src/app/models/enum/account-status.enum';
import { UserManagementComponentService } from 'src/app/services/components/user-management-component-service/user-management-component.service';
import { BaseUnsubscribeComponent } from '../../base-unsubscribe.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent extends BaseUnsubscribeComponent implements OnInit {
  accountStatus = AccountStatus;

  users$: Observable<AccountListResponse>;

  constructor(private componentService: UserManagementComponentService) {
    super();
  }

  ngOnInit(): void {
    this.users$ = this.componentService.getUsers$();
  }

  editUserAccount(userID: string, status: AccountStatus): void {
    this.users$ = this.componentService.updateUserStatus$({ userID: userID, accountStatus: status }).pipe(
      take(1),
      switchMap(() => this.componentService.getUsers$()),
      takeUntil(this.unsubscribe$)
    );
  }
}
