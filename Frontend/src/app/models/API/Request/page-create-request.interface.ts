import { SharePrivacy } from '../../enum/share-privacy.enum';

export interface PageCreateRequest {
  title: string;
  privacy: SharePrivacy;
  folderID: string;
}
