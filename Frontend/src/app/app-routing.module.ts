import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/pages/status-pages/error/error.component';
import { LoginComponent } from './components/pages/login/login.component';
import { NotFoundComponent } from './components/pages/status-pages/not-found/not-found.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ComposeComponent } from './components/pages/compose-review/compose-review.component';
import { CanActivateAuthenticatedGuardService } from './services/route-guards/can-activate-authenticated-guard.service';
import { RequestComponent } from './components/pages/request/request.component';
import { ViewRequestsComponent } from './components/pages/view-requests/view-requests.component';
import { CanActivateViewRequestsGuardService } from './services/route-guards/can-activate-view-requests-guard.service';
import { EditReviewComponent } from './components/pages/edit-review/edit-review.component';
import { CanActivateEditReviewGuardService } from './services/route-guards/can-activate-edit-review-guard.service';
import { CreateAccountTokenComponent } from './components/pages/create-account-token/create-account-token.component';
import { CanActivateCreateAccountTokenGuardService } from './services/route-guards/can-activate-create-account-token-guard.service';
import { AccountCreatedComponent } from './components/pages/status-pages/account-created/account-created.component';
import { LoggedOutComponent } from './components/pages/status-pages/logged-out/logged-out.component';
import { UpdateCharacterComponent } from './components/pages/update-character/update-character.component';
import { InfoComponent } from './components/pages/info/info.component';
import { ReportComponent } from './components/pages/report/report.component';
import { ReportSentComponent } from './components/pages/status-pages/report-sent/report-sent.component';
import { UserManagementComponent } from './components/pages/user-management/user-management.component';
import { CanActivateUserManagementGuardService } from './services/route-guards/can-activate-user-management-guard.service';
import { RequestSubmittedComponent } from './components/pages/status-pages/request-submitted/request-submitted.component';

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
    path: 'compose',
    component: ComposeComponent,
    canActivate: [CanActivateAuthenticatedGuardService]
  },
  {
    path: 'request',
    component: RequestComponent
  },
  {
    path: 'view-requests',
    component: ViewRequestsComponent,
    canActivate: [CanActivateAuthenticatedGuardService, CanActivateViewRequestsGuardService]
  },
  {
    path: 'edit-review',
    component: EditReviewComponent,
    canActivate: [CanActivateAuthenticatedGuardService, CanActivateEditReviewGuardService]
  },
  {
    path: 'create-account-token',
    component: CreateAccountTokenComponent,
    canActivate: [CanActivateAuthenticatedGuardService, CanActivateCreateAccountTokenGuardService]
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
    path: 'report-sent',
    component: ReportSentComponent
  },
  {
    path: 'request-submitted',
    component: RequestSubmittedComponent
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
    path: 'report',
    component: ReportComponent
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
