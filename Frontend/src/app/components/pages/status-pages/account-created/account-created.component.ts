import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountType } from 'src/app/models/enum/account-type.enum';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-account-created',
  templateUrl: './account-created.component.html',
  styleUrls: ['./account-created.component.css']
})
export class AccountCreatedComponent implements OnInit {
  accountType$: Observable<AccountType>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.accountType$ = this.authService.getUserAccountType$();
  }

  getAccountPermissions(type: AccountType): string[] {
    var permissions = [];

    permissions.push('Post reviews');
    permissions.push('Edit & Delete your reviews');

    switch (type) {
      case AccountType.ADMIN:
        permissions.push('Create Account Tokens');
      case AccountType.MODERATOR:
        permissions.push("Edit & Delete others' reviews");
        permissions.push('View & Delete reports');
      case AccountType.REVIEWER:
        permissions.push('View & Delete user requests');
    }

    return permissions;
  }
}
