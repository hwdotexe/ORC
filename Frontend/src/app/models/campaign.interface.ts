import { CampaignPlayer } from './campaign-player.interface';

export interface Campaign {
  campaignID: string;
  ownerAccountID: string;
  systemID: string;
  name: string;
  description: string;
  players: CampaignPlayer[];
}
