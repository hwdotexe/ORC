import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { UserManagementComponent } from './components/pages/user-management/user-management.component';
import { CanActivateAuthenticatedGuardService } from './services/route-guards/can-activate-authenticated-guard.service';
import { CanActivateRefreshTokenGuardService } from './services/route-guards/can-activate-refresh-token-guard.service';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateAuthenticatedGuardService]
  },
  {
    path: 'dashboard/notes',
    component: DashboardComponent,
    canActivate: [CanActivateAuthenticatedGuardService]
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate: [CanActivateAuthenticatedGuardService, CanActivateRefreshTokenGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticatedRoutingModule {}
