import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AccountStatusChangeRequest } from 'src/app/models/API/Request/account-status-change-request.interface';
import { AccountListResponse } from 'src/app/models/API/Response/account-list-response.interface';
import { HTTPService } from '../../httpservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementComponentService {
  constructor(private httpService: HTTPService) {}

  getUsers$(): Observable<AccountListResponse> {
    return this.httpService.GET<AccountListResponse>('user/status', 'LIST_USERS').pipe(
      take(1),
      map(response => {
        return response.body;
      })
    );
  }

  updateUserStatus$(request: AccountStatusChangeRequest): Observable<number> {
    return this.httpService.POST<any>('user/status', request, 'UPDATE_USER').pipe(
      take(1),
      map(response => {
        return response.status;
      })
    );
  }
}
