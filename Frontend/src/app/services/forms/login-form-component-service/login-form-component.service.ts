import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AccountLoginRequest } from 'src/app/models/API/Request/account-login-request.interface';
import { AccountAuthenticatedResponse } from 'src/app/models/API/Response/account-authenticated-response.interface';
import { AuthStateService } from 'src/app/store/auth-state/auth-state.service';
import { HTTPService } from '../../httpservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginFormComponentService {
  constructor(private httpService: HTTPService, private authStateService: AuthStateService, private router: Router) {}

  sendLoginData(loginData: AccountLoginRequest): Observable<number> {
    return this.httpService.POST<AccountAuthenticatedResponse>('user', loginData, 'LOGIN').pipe(
      take(1),
      map(response => {
        if (response.statusCode === 200) {
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
