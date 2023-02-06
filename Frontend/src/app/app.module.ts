import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MetaReducer, StoreModule } from '@ngrx/store';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment.dev';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { UpdateCharacterFormComponent } from './components/forms/update-character-form/update-character-form.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { FrontPageComponent } from './components/pages/front-page/front-page.component';
import { InfoComponent } from './components/pages/info/info.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { AccountCreatedComponent } from './components/pages/status-pages/account-created/account-created.component';
import { ErrorComponent } from './components/pages/status-pages/error/error.component';
import { LoggedOutComponent } from './components/pages/status-pages/logged-out/logged-out.component';
import { NotFoundComponent } from './components/pages/status-pages/not-found/not-found.component';
import { UpdateCharacterComponent } from './components/pages/update-character/update-character.component';
import { UserManagementComponent } from './components/pages/user-management/user-management.component';
import {
  ButtonDirectiveBlue,
  ButtonDirectiveBlueDisabled,
  ButtonDirectiveGreen,
  ButtonDirectiveOrange,
  ButtonDirectiveRed,
  ButtonDirectiveSimple
} from './components/ui/button.directive';
import { CaseNavComponent } from './components/ui/case-nav/case-nav.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { FormErrorComponent } from './components/ui/form-error/form-error/form-error.component';
import { InputDirective } from './components/ui/input.directive';
import { NavComponent } from './components/ui/nav/nav.component';
import { SelectDirective } from './components/ui/select.directive';
import { TextareaDirective } from './components/ui/textarea.directive';
import { TimePipe } from './pipes/time.pipe';
import { AppStateEffects } from './store/app-state/app-state.effects';
import { AuthStateEffects } from './store/auth-state/auth-state.effects';
import { CampaignStateEffects } from './store/campaigns-state/campaigns-state.effects';
import { localstorageMetaReducer } from './store/localstorage-meta.reducer';
import { rootReducer } from './store/store';
import { SubmitButtonComponent } from './components/ui/submit-button/submit-button.component';

export const metaReducers: MetaReducer[] = [localstorageMetaReducer];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    InputDirective,
    ButtonDirectiveSimple,
    ButtonDirectiveBlue,
    ButtonDirectiveBlueDisabled,
    ButtonDirectiveRed,
    ButtonDirectiveGreen,
    ButtonDirectiveOrange,
    SelectDirective,
    TextareaDirective,
    FormErrorComponent,
    DashboardComponent,
    ErrorComponent,
    NotFoundComponent,
    RegisterComponent,
    AccountCreatedComponent,
    LoggedOutComponent,
    UpdateCharacterComponent,
    InfoComponent,
    LoginFormComponent,
    RegisterFormComponent,
    UpdateCharacterFormComponent,
    TimePipe,
    UserManagementComponent,
    FrontPageComponent,
    NavComponent,
    CaseNavComponent,
    SubmitButtonComponent
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecaptchaV3Module,
    StoreModule.forRoot(rootReducer, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !environment.production,
      autoPause: false
      //trace, traceLimit
    }),
    EffectsModule.forRoot([AuthStateEffects, AppStateEffects, CampaignStateEffects]),
    BrowserAnimationsModule
  ],
  providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: 'site_key' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
