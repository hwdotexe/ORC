import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DeleteRequestRequest } from 'src/app/models/API/Request/delete-request-request.interface';
import { HTTPService } from '../httpservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  hasError$ = new BehaviorSubject<boolean>(false);

  constructor(private httpService: HTTPService) {}

  getRequests$(): Observable<Request[]> {
    this.hasError$.next(false);

    return this.httpService.GET<Request[]>('review/request').pipe(
      take(1),
      map(response => {
        if (response.statusCode === 200) {
          return response.responseBody;
        } else {
          this.hasError$.next(true);
        }
      })
    );
  }

  deleteRequest$(request: DeleteRequestRequest): Observable<boolean> {
    return this.httpService.DELETE<DeleteRequestRequest>('review/request', request).pipe(
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
