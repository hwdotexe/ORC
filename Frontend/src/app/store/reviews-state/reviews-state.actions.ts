import { createAction, props } from '@ngrx/store';
import { Review } from 'src/app/models/API/review.interface';
import { AccountType } from 'src/app/models/enum/account-type.enum';

export abstract class ReviewsStateActions {
  static readonly REVIEWS_DATA_RECEIVED = createAction('REVIEWS_DATA_RECEIVED', props<{ reviews: Review[] }>());
  static readonly REVIEWS_DATA_CLEARED = createAction('REVIEWS_DATA_CLEARED');
}
