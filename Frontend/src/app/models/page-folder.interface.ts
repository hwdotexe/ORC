import { ShareMapping } from './share-mapping.interface';

export interface PageFolder {
  folderID: string;
  accountOwnerID: string;
  folderName: string;
  shares: ShareMapping;
  pages: string[];
}
