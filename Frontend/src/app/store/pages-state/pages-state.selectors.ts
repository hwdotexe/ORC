import { AppState } from '../app-state.interface';

export abstract class PagesStateSelectors {
  static readonly pages = (state: AppState) => state.pagesState.pages;
  static readonly pageFolders = (state: AppState) => state.pagesState.pageFolders;
}
