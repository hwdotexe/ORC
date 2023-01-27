import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ComposeRequestRequest } from 'src/app/models/API/Request/compose-request-request.interface';
import { HTTPService } from '../../httpservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class RequestReviewFormComponentService {
  constructor(private httpService: HTTPService) {}

  sendRequestData(reviewData: ComposeRequestRequest): Observable<number> {
    return this.httpService.PUT<ComposeRequestRequest>('review/request', reviewData, 'REQUEST_REVIEW').pipe(
      take(1),
      map(response => {
        return response.statusCode;
      })
    );
  }
}
