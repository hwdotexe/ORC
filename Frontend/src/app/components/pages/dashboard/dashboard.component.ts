import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { PageLoadingService } from 'src/app/services/page-loading-service/page-loading.service';
import { PermissionsService } from 'src/app/services/permissions-service/permissions.service';
import { BaseUnsubscribeComponent } from '../../base-unsubscribe.component';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseUnsubscribeComponent implements OnInit {
  isLoading$: Observable<boolean>;
  hasError$: BehaviorSubject<boolean>;

  canPostReview$: Observable<boolean>;
  canViewRequests$: Observable<boolean>;
  canViewReports$: Observable<boolean>;
  canCreateAccountToken$: Observable<boolean>;
  canManageUsers$: Observable<boolean>;

  userName$: Observable<string>;
  userAvatarURL$: Observable<string>;
  userAccountType$: Observable<string>;

  tagFilter: string[] = [];

  constructor(
    private pageLoadingService: PageLoadingService,
    private permissionsService: PermissionsService,
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.pageLoadingService.showLoadingIcon$;
    this.canManageUsers$ = this.permissionsService.canManageUsers$();
    this.userName$ = this.authService.getDisplayName$();
    this.userAccountType$ = this.authService.getUserAccountType$();
  }
}
