import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AccountCreateRequest } from 'src/app/models/API/Request/account-create-request.interface';
import { AccountAuthenticatedResponse } from 'src/app/models/API/Response/account-authenticated-response.interface';
import { AuthStateService } from 'src/app/store/auth-state/auth-state.service';
import { HTTPService } from '../../httpservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormComponentService {
  constructor(private httpService: HTTPService, private authStateService: AuthStateService, private router: Router) {}

  sendRegisterData(registerData: AccountCreateRequest): Observable<number> {
    return this.httpService.PUT<AccountAuthenticatedResponse>('user', registerData, 'REGISTER').pipe(
      take(1),
      map(response => {
        if (response.statusCode === 201) {
          this.authStateService.onAuthDataReceived(
            response.responseBody.authToken,
            response.responseBody.accountID,
            response.responseBody.displayName,
            response.responseBody.accountType
          );
        }

        return response.statusCode;
      })
    );
  }
}
