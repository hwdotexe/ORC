import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AccountUpdateRequest } from 'src/app/models/API/Request/account-update-request.interface';
import { AccountUpdateResponse } from 'src/app/models/API/Response/account-update-response.interface';
import { HTTPService } from '../../httpservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateCharacterFormComponentService {
  constructor(private httpService: HTTPService) {}

  sendCharacterData(request: AccountUpdateRequest): Observable<AccountUpdateResponse> {
    return this.httpService.PATCH<AccountUpdateResponse>('user', request, 'UPDATE_CHARACTER').pipe(
      take(1),
      map(response => {
        return response.responseBody;
      })
    );
  }
}
