import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DeleteCreateAccountTokenRequest } from 'src/app/models/API/Request/delete-create-account-token-request.interface';
import { UserUpdateManagementRequest } from 'src/app/models/API/Request/user-update-management-request.interface';
import { GetCreateAccountTokensResponse } from 'src/app/models/API/Response/get-create-account-tokens-response.interface';
import { UsersGetResponse } from 'src/app/models/API/Response/users-get-response.interface';
import { HTTPService } from '../../httpservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementComponentService {
  constructor(private httpService: HTTPService) {}

  getUnusedTokens$(): Observable<GetCreateAccountTokensResponse> {
    return this.httpService.GET<GetCreateAccountTokensResponse>('token', 'GET_TOKENS').pipe(
      take(1),
      map(response => {
        return response.responseBody;
      })
    );
  }

  deleteToken$(request: DeleteCreateAccountTokenRequest): Observable<number> {
    return this.httpService.DELETE<any>('token', request, 'DELETE_TOKEN').pipe(
      take(1),
      map(response => {
        return response.statusCode;
      })
    );
  }

  getUsers$(): Observable<UsersGetResponse> {
    return this.httpService.GET<UsersGetResponse>('user/status', 'LIST_USERS').pipe(
      take(1),
      map(response => {
        return response.responseBody;
      })
    );
  }

  updateUserStatus$(request: UserUpdateManagementRequest): Observable<number> {
    return this.httpService.POST<any>('user/status', request, 'UPDATE_USER').pipe(
      take(1),
      map(response => {
        return response.statusCode;
      })
    );
  }
}
