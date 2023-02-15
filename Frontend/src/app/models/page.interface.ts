import { SharePrivacy } from './enum/share-privacy.enum';
import { ShareMapping } from './share-mapping.interface';

export interface Page {
  pageID: string;
  ownerAccountID: string;
  title: string;
  body: string;
  privacy: SharePrivacy;
  shares: ShareMapping[];
  dateCreated: Date;
  dateModified: Date;
}
