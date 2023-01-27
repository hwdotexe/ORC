import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/pages/status-pages/error/error.component';
import { LoginComponent } from './components/pages/login/login.component';
import { NotFoundComponent } from './components/pages/status-pages/not-found/not-found.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { CanActivateAuthenticatedGuardService } from './services/route-guards/can-activate-authenticated-guard.service';
import { AccountCreatedComponent } from './components/pages/status-pages/account-created/account-created.component';
import { LoggedOutComponent } from './components/pages/status-pages/logged-out/logged-out.component';
import { UpdateCharacterComponent } from './components/pages/update-character/update-character.component';
import { InfoComponent } from './components/pages/info/info.component';
import { UserManagementComponent } from './components/pages/user-management/user-management.component';
import { CanActivateUserManagementGuardService } from './services/route-guards/can-activate-user-management-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
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
  },
  {
    path: 'update-character',
    component: UpdateCharacterComponent,
    canActivate: [CanActivateAuthenticatedGuardService]
  },
  {
    path: 'logged-out',
    component: LoggedOutComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
