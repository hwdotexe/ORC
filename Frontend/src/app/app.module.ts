import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MetaReducer, StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { rootReducer } from './store/store';
import { LoginComponent } from './components/pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InputDirective } from './components/ui/input.directive';
import { FormErrorComponent } from './components/ui/form-error/form-error/form-error.component';
import { ErrorComponent } from './components/pages/status-pages/error/error.component';
import { localstorageMetaReducer } from './store/localstorage-meta.reducer';
import { SelectDirective } from './components/ui/select.directive';
import { NotFoundComponent } from './components/pages/status-pages/not-found/not-found.component';
import {
  ButtonDirectiveBlue,
  ButtonDirectiveBlueDisabled,
  ButtonDirectiveGreen,
  ButtonDirectiveOrange,
  ButtonDirectiveRed,
  ButtonDirectiveSimple
} from './components/ui/button.directive';
import { RegisterComponent } from './components/pages/register/register.component';
import { TextareaDirective } from './components/ui/textarea.directive';
import { AccountCreatedComponent } from './components/pages/status-pages/account-created/account-created.component';
import { LoggedOutComponent } from './components/pages/status-pages/logged-out/logged-out.component';
import { UpdateCharacterComponent } from './components/pages/update-character/update-character.component';
import { InfoComponent } from './components/pages/info/info.component';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { HeaderComponent } from './components/ui/header/header.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { UpdateCharacterFormComponent } from './components/forms/update-character-form/update-character-form.component';
import { TimePipe } from './pipes/time.pipe';
import { UserManagementComponent } from './components/pages/user-management/user-management.component';
import { HomeComponent } from './components/pages/home/home.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthStateEffects } from './store/auth-state/auth-state.effects';

export const metaReducers: MetaReducer[] = [localstorageMetaReducer];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
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
    HomeComponent,
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
    UserManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecaptchaV3Module,
    StoreModule.forRoot(rootReducer, { metaReducers }),
    EffectsModule.forRoot([AuthStateEffects])
  ],
  providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: 'site_key' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
