import { SharePrivacy } from '../../enum/share-privacy.enum';

export interface PageEditRequest {
  pageID: string;
  title: string;
  body: string;
  privacy: SharePrivacy;
}
