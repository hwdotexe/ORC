import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './components/pages/front-page/front-page.component';
import { InfoComponent } from './components/pages/info/info.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ErrorComponent } from './components/pages/status-pages/error/error.component';
import { LoggedOutComponent } from './components/pages/status-pages/logged-out/logged-out.component';
import { NotFoundComponent } from './components/pages/status-pages/not-found/not-found.component';
import { TimedOutComponent } from './components/pages/status-pages/timed-out/timed-out.component';

const routes: Routes = [
  {
    path: '',
    component: FrontPageComponent,
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
    path: 'logged-out',
    component: LoggedOutComponent
  },
  {
    path: 'timed-out',
    component: TimedOutComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  {
    path: 'app',
    loadChildren: () => import('./authenticated-routing.module').then(m => m.AuthenticatedRoutingModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
