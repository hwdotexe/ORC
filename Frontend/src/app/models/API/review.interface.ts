import { ClubHours } from '../club-hours.interface';
import { AccountType } from '../enum/account-type.enum';

export interface Review {
  review: {
    reviewID: string;
    userID: string;
    reviewTitle: string;
    clubName: string;
    clubDatacenter: string;
    clubServer: string;
    clubDistrict: string;
    clubWard: string;
    clubPlot: string;
    clubHours: ClubHours[];
    summary: string;
    starRating: number;
    website: string;
    tags: string[];
    dateCreated: string;
  };
  user: {
    userID: string;
    characterName: string;
    characterServer: string;
    characterAvatar: string;
    accountType: AccountType;
  };
}
