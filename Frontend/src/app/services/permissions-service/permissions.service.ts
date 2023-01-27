import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { AccountType } from 'src/app/models/enum/account-type.enum';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  accountType$: Observable<AccountType>;
  userID$: Observable<string>;

  constructor(private authService: AuthService) {
    this.accountType$ = this.authService.getUserAccountType$();
    this.userID$ = this.authService.getUserID$();
  }

  canPostReview$(): Observable<boolean> {
    return this.accountType$.pipe(map(accountType => !!accountType));
  }

  canViewRequests$(): Observable<boolean> {
    return this.accountType$.pipe(
      filter(accountType => !!accountType),
      map(accountType => {
        return accountType === AccountType.ADMIN || accountType === AccountType.MODERATOR || accountType === AccountType.REVIEWER;
      })
    );
  }

  canViewReports$(): Observable<boolean> {
    return this.accountType$.pipe(
      filter(accountType => !!accountType),
      map(accountType => {
        return accountType === AccountType.ADMIN || accountType === AccountType.MODERATOR;
      })
    );
  }

  canCreateAccountToken$(): Observable<boolean> {
    return this.accountType$.pipe(
      filter(accountType => !!accountType),
      map(accountType => {
        return accountType === AccountType.ADMIN;
      })
    );
  }

  canManageUsers$(): Observable<boolean> {
    return this.accountType$.pipe(
      filter(accountType => !!accountType),
      map(accountType => {
        return accountType === AccountType.ADMIN;
      })
    );
  }

  canEditReview$(reviewUserID: string): Observable<boolean> {
    return this.accountType$.pipe(
      filter(accountType => !!accountType),
      withLatestFrom(this.userID$),
      map(([accountType, userID]) => {
        return accountType === AccountType.ADMIN || accountType === AccountType.MODERATOR || reviewUserID === userID;
      })
    );
  }
}
