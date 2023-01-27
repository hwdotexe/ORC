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
import { SelectTimeFormComponent } from './components/forms/select-time-form/select-time-form.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ErrorComponent } from './components/pages/status-pages/error/error.component';
import { localstorageMetaReducer } from './store/localstorage-meta.reducer';
import { SelectDirective } from './components/ui/select.directive';
import { NotFoundComponent } from './components/pages/status-pages/not-found/not-found.component';
import { ReviewTileComponent } from './components/ui/review-tile/review-tile.component';
import {
  ButtonDirectiveBlue,
  ButtonDirectiveBlueDisabled,
  ButtonDirectiveGreen,
  ButtonDirectiveOrange,
  ButtonDirectiveRed,
  ButtonDirectiveSimple
} from './components/ui/button.directive';
import { StarsComponent } from './components/ui/stars/stars.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ComposeComponent } from './components/pages/compose-review/compose-review.component';
import { TextareaDirective } from './components/ui/textarea.directive';
import { TagSelectComponent } from './components/ui/tag-select/tag-select.component';
import { TagComponent } from './components/ui/tag/tag.component';
import { RequestComponent } from './components/pages/request/request.component';
import { ViewRequestsComponent } from './components/pages/view-requests/view-requests.component';
import { RequestTileComponent } from './components/ui/request-tile/request-tile.component';
import { ReviewerNameComponent } from './components/ui/reviewer-name/reviewer-name.component';
import { EditReviewComponent } from './components/pages/edit-review/edit-review.component';
import { CreateAccountTokenComponent } from './components/pages/create-account-token/create-account-token.component';
import { AccountCreatedComponent } from './components/pages/status-pages/account-created/account-created.component';
import { LoggedOutComponent } from './components/pages/status-pages/logged-out/logged-out.component';
import { UpdateCharacterComponent } from './components/pages/update-character/update-character.component';
import { InfoComponent } from './components/pages/info/info.component';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { ReportTileComponent } from './components/ui/report-tile/report-tile.component';
import { ReportListComponent } from './components/ui/report-list/report-list.component';
import { ReportSentComponent } from './components/pages/status-pages/report-sent/report-sent.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { ReviewFormComponent } from './components/forms/review-form/review-form.component';
import { CreateAccountTokenFormComponent } from './components/forms/create-account-token-form/create-account-token-form.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { ReportFormComponent } from './components/forms/report-form/report-form.component';
import { ReportComponent } from './components/pages/report/report.component';
import { RequestReviewFormComponent } from './components/forms/request-review-form/request-review-form.component';
import { UpdateCharacterFormComponent } from './components/forms/update-character-form/update-character-form.component';
import { TimePipe } from './pipes/time.pipe';
import { UserManagementComponent } from './components/pages/user-management/user-management.component';
import { RequestSubmittedComponent } from './components/pages/status-pages/request-submitted/request-submitted.component';
import { SelectVariableTimeFormComponent } from './components/forms/select-variable-time-form/select-variable-time-form.component';

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
    ReviewTileComponent,
    StarsComponent,
    RegisterComponent,
    ComposeComponent,
    TagSelectComponent,
    TagComponent,
    RequestComponent,
    ViewRequestsComponent,
    RequestTileComponent,
    ReviewerNameComponent,
    EditReviewComponent,
    ReviewFormComponent,
    CreateAccountTokenComponent,
    AccountCreatedComponent,
    LoggedOutComponent,
    UpdateCharacterComponent,
    InfoComponent,
    ReportTileComponent,
    ReportListComponent,
    ReportSentComponent,
    CreateAccountTokenFormComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ReportFormComponent,
    ReportComponent,
    RequestReviewFormComponent,
    UpdateCharacterFormComponent,
    TimePipe,
    SelectTimeFormComponent,
    UserManagementComponent,
    RequestSubmittedComponent,
    SelectVariableTimeFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecaptchaV3Module,
    StoreModule.forRoot(rootReducer, { metaReducers })
  ],
  providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: '6Le1KYcgAAAAANk4IydQSldMIr26sT6b_SyrYg67' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
