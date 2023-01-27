import { Report } from 'src/app/models/API/report.interface';
import { Review } from 'src/app/models/API/review.interface';
import { AccountType } from 'src/app/models/enum/account-type.enum';

export interface ReportsState {
  reports: Report[];
}
