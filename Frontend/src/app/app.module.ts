import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MetaReducer, StoreModule } from '@ngrx/store';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { environment } from 'src/environments/environment.dev';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { PageEditFormComponent } from './components/forms/page-edit-form/page-edit-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { FrontPageComponent } from './components/pages/front-page/front-page.component';
import { InfoComponent } from './components/pages/info/info.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { AccountCreatedComponent } from './components/pages/status-pages/account-created/account-created.component';
import { ErrorComponent } from './components/pages/status-pages/error/error.component';
import { LoggedOutComponent } from './components/pages/status-pages/logged-out/logged-out.component';
import { NotFoundComponent } from './components/pages/status-pages/not-found/not-found.component';
import { TimedOutComponent } from './components/pages/status-pages/timed-out/timed-out.component';
import { UserManagementComponent } from './components/pages/user-management/user-management.component';
import {
  ButtonDirectiveBlue,
  ButtonDirectiveBlueDisabled,
  ButtonDirectiveGreen,
  ButtonDirectiveOrange,
  ButtonDirectiveRed,
  ButtonDirectiveSimple
} from './components/ui/button.directive';
import { CaseNavCategoryComponent } from './components/ui/case-nav-category/case-nav-category.component';
import { CaseNavNewItemComponent } from './components/ui/case-nav-new-item/case-nav-new-item.component';
import { CaseNavComponent } from './components/ui/case-nav/case-nav.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { FormErrorComponent } from './components/ui/form-error/form-error.component';
import { FormFieldErrorComponent } from './components/ui/form-field-error/form-field-error.component';
import { InputDirective } from './components/ui/input.directive';
import { LoadingSpinnerComponent } from './components/ui/loading-spinner/loading-spinner.component';
import { NavComponent } from './components/ui/nav/nav.component';
import { PageFolderButtonComponent } from './components/ui/page-folder-button/page-folder-button.component';
import { PageItemComponent } from './components/ui/page-item/page-item.component';
import { SelectDirective } from './components/ui/select.directive';
import { SubmitButtonComponent } from './components/ui/submit-button/submit-button.component';
import { TextareaDirective } from './components/ui/textarea.directive';
import { CampaignViewComponent } from './components/views/campaign-view/campaign-view.component';
import { PageFolderViewComponent } from './components/views/page-folder-view/page-folder-view.component';
import { PageViewComponent } from './components/views/page-view/page-view.component';
import { markedOptionsFactory } from './markdownOptions';
import { TimePipe } from './pipes/time.pipe';
import { AppDetailsStateEffects } from './store/app-details-state/app-details-state.effects';
import { AuthStateEffects } from './store/auth-state/auth-state.effects';
import { CampaignStateEffects } from './store/campaigns-state/campaigns-state.effects';
import { localstorageMetaReducer } from './store/localstorage-meta.reducer';
import { PagesStateEffects } from './store/pages-state/pages-state.effects';
import { rootReducer } from './store/store';

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
    FormFieldErrorComponent,
    DashboardComponent,
    ErrorComponent,
    NotFoundComponent,
    RegisterComponent,
    AccountCreatedComponent,
    LoggedOutComponent,
    InfoComponent,
    LoginFormComponent,
    RegisterFormComponent,
    TimePipe,
    UserManagementComponent,
    FrontPageComponent,
    NavComponent,
    CaseNavComponent,
    SubmitButtonComponent,
    FormErrorComponent,
    CampaignViewComponent,
    PageFolderButtonComponent,
    PageFolderViewComponent,
    CaseNavCategoryComponent,
    PageItemComponent,
    PageViewComponent,
    PageEditFormComponent,
    CaseNavNewItemComponent,
    LoadingSpinnerComponent,
    TimedOutComponent
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
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory
      }
    }),
    EffectsModule.forRoot([AuthStateEffects, AppDetailsStateEffects, CampaignStateEffects, PagesStateEffects]),
    BrowserAnimationsModule
  ],
  providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: 'site_key' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
