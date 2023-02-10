import { Page } from './page.interface';
import { ShareMapping } from './share-mapping.interface';

export interface PageFolderData {
  folderID: string;
  ownerAccountID: string;
  folderName: string;
  shares: ShareMapping[];
  pages: Page[];
}
