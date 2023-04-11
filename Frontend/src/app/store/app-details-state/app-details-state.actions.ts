import { createAction, props } from '@ngrx/store';
import { FormError } from 'src/app/models/form-validation-error.interface';

export abstract class AppDetailsStateActions {
  static readonly serverError = createAction('@critcase/action/error/server', props<{ error: any }>());
  static readonly formError = createAction('@critcase/action/error/form', props<{ error: FormError }>());
  static readonly formErrorsCleared = createAction('@critcase/action/error/form/clear');
  static readonly clearFullState = createAction('@critcase/action/state/cleared');
  static readonly authenticationHeartbeatAttempt = createAction('@critcase/action/heartbeat/attempt');
  static readonly authenticationHeartbeatSucceeded = createAction('@critcase/action/heartbeat/succeed');
}
