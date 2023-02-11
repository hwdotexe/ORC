import { createReducer, on } from '@ngrx/store';
import { pagesInitialState } from './pages-initial-state';
import { PagesStateActions } from './pages-state.actions';
import { PagesState } from './pages-state.interface';

const reducer = createReducer(
  pagesInitialState,
  on(
    PagesStateActions.pageFoldersListReceived,
    (state, action): PagesState => ({
      ...state,
      pageFolders: action.response
    })
  ),
  on(PagesStateActions.pageFoldersDataReceived, (state, action): PagesState => {
    var currentPages = state?.pages || [];

    return {
      ...state,
      pages: currentPages.concat(action.response.pages)
    };
  }),
  on(PagesStateActions.pagesDataCleared, (state, action): PagesState => pagesInitialState)
);

export function pagesStateReducer(state, action) {
  return reducer(state, action);
}
