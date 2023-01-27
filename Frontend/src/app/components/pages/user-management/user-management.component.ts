import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { GetCreateAccountTokensResponse } from 'src/app/models/API/Response/get-create-account-tokens-response.interface';
import { UsersGetResponse } from 'src/app/models/API/Response/users-get-response.interface';
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

  unusedTokens$: Observable<GetCreateAccountTokensResponse>;
  users$: Observable<UsersGetResponse>;

  constructor(private componentService: UserManagementComponentService) {
    super();
  }

  ngOnInit(): void {
    this.unusedTokens$ = this.componentService.getUnusedTokens$();
    this.users$ = this.componentService.getUsers$();
  }

  editUserAccount(userID: string, status: AccountStatus): void {
    this.users$ = this.componentService.updateUserStatus$({ userID: userID, accountStatus: status }).pipe(
      take(1),
      switchMap(() => this.componentService.getUsers$()),
      takeUntil(this.unsubscribe$)
    );
  }

  deleteToken(tokenID: string): void {
    this.unusedTokens$ = this.componentService.deleteToken$({ tokenID: tokenID }).pipe(
      take(1),
      switchMap(() => this.componentService.getUnusedTokens$()),
      takeUntil(this.unsubscribe$)
    );
  }
}
