import { createAction, props } from '@ngrx/store';
import { AccountLoginRequest } from 'src/app/models/API/Request/account-login-request.interface';
import { AccountAuthenticatedResponse } from 'src/app/models/API/Response/account-authenticated-response.interface';

export abstract class AuthStateActions {
  static readonly loginAttempt = createAction('AUTH_ATTEMPT', props<{ request: AccountLoginRequest }>());
  static readonly loginSuccess = createAction('AUTH_SUCCESS', props<{ response: AccountAuthenticatedResponse }>());
  static readonly loginFailure = createAction('AUTH_FAILURE', props<{ error: any }>());
  static readonly logOutAttempt = createAction('AUTH_LOG_OUT_ATTEMPT');
  static readonly logOutSuccess = createAction('AUTH_LOG_OUT_SUCCESS');

  static readonly AUTH_TOKEN_NOT_ACCEPTED = createAction('AUTH_TOKEN_NOT_ACCEPTED');
  static readonly AUTH_DATA_CLEARED = createAction('AUTH_DATA_CLEARED');
  static readonly AUTH_DATA_INFO_UPDATED = createAction('AUTH_DATA_INFO_UPDATED', props<{ displayName: string }>());
}
