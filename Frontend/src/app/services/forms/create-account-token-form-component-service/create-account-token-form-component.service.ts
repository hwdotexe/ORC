import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CreateAccountTokenRequest } from 'src/app/models/API/Request/create-account-token-request.interface';
import { CreateAccountTokenResponse } from 'src/app/models/API/Response/create-account-token-response.interface';
import { HTTPService } from '../../httpservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountTokenFormComponentService {
  constructor(private httpService: HTTPService) {}

  sendTokenData(request: CreateAccountTokenRequest): Observable<CreateAccountTokenResponse> {
    return this.httpService.POST<CreateAccountTokenResponse>('token', request, 'CREATE_TOKEN').pipe(
      take(1),
      map(response => {
        return response.responseBody;
      })
    );
  }
}
