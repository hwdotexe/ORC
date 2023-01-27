import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { Report } from 'src/app/models/API/report.interface';
import { DeleteReportRequest } from 'src/app/models/API/Request/delete-report-request.interface';
import { GetReportsResponse } from 'src/app/models/API/Response/get-reports-response';
import { ReportsStateService } from 'src/app/store/reports-state/reviews-state.service';
import { HTTPService } from '../httpservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  hasError$ = new BehaviorSubject<boolean>(false);

  constructor(private reportsStateService: ReportsStateService, private httpService: HTTPService) {}

  getReportByID$(id: string): Observable<Report> {
    return this.reportsStateService.reports$.pipe(
      map(reviews => {
        return reviews.filter(report => report.reportID === id)[0];
      })
    );
  }

  loadReports$(): Observable<Report[]> {
    this.hasError$.next(false);

    return this.httpService.GET<GetReportsResponse>('review/report').pipe(
      take(1),
      switchMap(response => {
        if (response.statusCode === 200) {
          this.reportsStateService.onReportsDataReceived(response.responseBody);

          return this.reportsStateService.reports$;
        } else {
          this.hasError$.next(true);
        }
      })
    );
  }

  deleteReport$(request: DeleteReportRequest): Observable<boolean> {
    return this.httpService.DELETE<DeleteReportRequest>('review/report', request).pipe(
      take(1),
      map(response => {
        if (response.statusCode === 200) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
