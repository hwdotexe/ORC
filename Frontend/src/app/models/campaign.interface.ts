import { CampaignPlayer } from './campaign-player.interface';
import { PageFolder } from './page-folder.interface';

export interface Campaign {
  campaignID: string;
  ownerAccountID: string;
  systemID: string;
  name: string;
  description: string;
  players: CampaignPlayer[];
  pageFolders: PageFolder[];
}
