import { PageFolder } from 'src/app/models/page-folder.interface';
import { Page } from 'src/app/models/page.interface';

export interface PagesState {
  pages: Page[];
  pageFolders: PageFolder[];
}
