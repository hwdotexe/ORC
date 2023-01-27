import { ClubHoursRequest } from './club-hours-request.interface';

export interface EditReviewRequest {
  reviewid: string;
  title: string;
  clubName: string;
  clubDatacenter: string;
  clubServer: string;
  clubDistrict: string;
  clubWard: number;
  clubPlot: number;
  clubHours: ClubHoursRequest[];
  summary: string;
  starRating: number;
  website: string;
  tags: string[];
}
