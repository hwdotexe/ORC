import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { AccountCreatedComponent } from './components/pages/status-pages/account-created/account-created.component';
import { UserManagementComponent } from './components/pages/user-management/user-management.component';
import { CanActivateAuthenticatedGuardService } from './services/route-guards/can-activate-authenticated-guard.service';
import { CanActivateUserManagementGuardService } from './services/route-guards/can-activate-user-management-guard.service';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'dashboard/notes',
    component: DashboardComponent
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate: [CanActivateAuthenticatedGuardService, CanActivateUserManagementGuardService]
  },
  {
    path: 'account-created',
    component: AccountCreatedComponent,
    canActivate: [CanActivateAuthenticatedGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticatedRoutingModule {}
