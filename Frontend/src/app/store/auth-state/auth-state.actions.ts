import { createAction, props } from '@ngrx/store';
import { AccountCreateRequest } from 'src/app/models/API/Request/account-create-request.interface';
import { AccountLoginRequest } from 'src/app/models/API/Request/account-login-request.interface';
import { AccountAuthenticatedResponse } from 'src/app/models/API/Response/account-authenticated-response.interface';
import { FormName } from 'src/app/models/enum/form-name.enum';

export abstract class AuthStateActions {
  static readonly registerAttempt = createAction('@critcase/action/register/attempt', props<{ request: AccountCreateRequest }>());
  static readonly registerSuccess = createAction('@critcase/action/register/success', props<{ response: AccountAuthenticatedResponse }>());
  static readonly loginAttempt = createAction('@critcase/action/login/attempt', props<{ request: AccountLoginRequest }>());
  static readonly loginSuccess = createAction('@critcase/action/login/success', props<{ response: AccountAuthenticatedResponse }>());
  static readonly authFailure = createAction('@critcase/action/authentication/failure', props<{ form: FormName; error: any }>());
  static readonly logOutAttempt = createAction('@critcase/action/logout/attempt');
  static readonly logOutSuccess = createAction('@critcase/action/logout/success');
  static readonly authDataCleared = createAction('@critcase/action/authentication/cleared');

  static readonly AUTH_TOKEN_NOT_ACCEPTED = createAction('AUTH_TOKEN_NOT_ACCEPTED');
  static readonly AUTH_DATA_CLEARED = createAction('AUTH_DATA_CLEARED');
  static readonly AUTH_DATA_INFO_UPDATED = createAction('AUTH_DATA_INFO_UPDATED', props<{ displayName: string }>());
}
