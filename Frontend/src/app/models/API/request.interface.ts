import { AccountType } from '../enum/account-type.enum';

export interface Request {
  requestID: string;
  requestorServer: string;
  requestorName: string;
  clubName: string;
  clubDatacenter: string;
  clubServer: string;
  clubDistrict: string;
  clubWard: number;
  clubPlot: number;
  clubHours: string;
  clubWebsite: string;
  info: string;
}
