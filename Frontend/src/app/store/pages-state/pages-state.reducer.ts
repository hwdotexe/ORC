import { createReducer, on } from '@ngrx/store';
import { PageFolder } from 'src/app/models/page-folder.interface';
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
  on(PagesStateActions.pageFolderCreateReceived, (state, action): PagesState => {
    var currentFolders = state.pageFolders;

    return {
      ...state,
      pageFolders: [...currentFolders, action.response]
    };
  }),
  on(PagesStateActions.pageFoldersDataReceived, (state, action): PagesState => {
    return {
      ...state,
      pages: action.response.pages
    };
  }),
  on(PagesStateActions.pageUpdateReceived, (state, action): PagesState => {
    var currentPages = state.pages;
    var newPages = [];

    currentPages.forEach(page => {
      if (page.pageID === action.response.pageID) {
        newPages = [...newPages, action.response];
      } else {
        newPages = [...newPages, page];
      }
    });

    return {
      ...state,
      pages: newPages
    };
  }),
  on(PagesStateActions.pageCreateReceived, (state, action): PagesState => {
    var currentPages = state.pages;
    var pageFolder = state.pageFolders.find(f => f.folderID === action.folderID);
    var newFolder: PageFolder = { ...pageFolder, pages: [...pageFolder.pages, action.response.pageID] };
    var newFolders = [];

    state.pageFolders.forEach(folder => {
      if (folder.folderID === action.folderID) {
        newFolders = [...newFolders, newFolder];
      } else {
        newFolders = [...newFolders, folder];
      }
    });

    return {
      ...state,
      pages: [...currentPages, action.response],
      pageFolders: newFolders
    };
  }),
  on(PagesStateActions.pagesDataCleared, (state, action): PagesState => pagesInitialState)
);

export function pagesStateReducer(state, action) {
  return reducer(state, action);
}
