import { createAction, props } from '@ngrx/store';

export abstract class AppStateActions {
  static readonly serverError = createAction('@critcase/action/error/server', props<{ error: any }>());
}
