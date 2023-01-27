import { createAction, props } from '@ngrx/store';
import { AccountType } from 'src/app/models/enum/account-type.enum';

export abstract class AuthStateActions {
  static readonly AUTH_DATA_RECEIVED = createAction(
    'AUTH_DATA_RECEIVED',
    props<{ authToken: string; userid: string; displayName: string; accountType: AccountType }>()
  );
  static readonly AUTH_TOKEN_NOT_ACCEPTED = createAction('AUTH_TOKEN_NOT_ACCEPTED');
  static readonly AUTH_DATA_CLEARED = createAction('AUTH_DATA_CLEARED');
  static readonly AUTH_DATA_INFO_UPDATED = createAction('AUTH_DATA_INFO_UPDATED', props<{ displayName: string }>());
}
