import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserUpdateRequest } from 'src/app/models/API/Request/user-update-request.interface';
import { UserUpdateResponse } from 'src/app/models/API/Response/user-update-response.interface';
import { HTTPService } from '../../httpservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateCharacterFormComponentService {
  constructor(private httpService: HTTPService) {}

  sendCharacterData(request: UserUpdateRequest): Observable<UserUpdateResponse> {
    return this.httpService.PATCH<UserUpdateResponse>('user', request, 'UPDATE_CHARACTER').pipe(
      take(1),
      map(response => {
        return response.responseBody;
      })
    );
  }
}
