import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ComposeReportRequest } from 'src/app/models/API/Request/compose-report-request.interface';
import { HTTPService } from '../../httpservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class ReportFormComponentService {
  constructor(private httpService: HTTPService) {}

  sendRequestData(reviewData: ComposeReportRequest): Observable<number> {
    return this.httpService.PUT<ComposeReportRequest>('review/report', reviewData).pipe(
      take(1),
      map(response => {
        return response.statusCode;
      })
    );
  }
}
