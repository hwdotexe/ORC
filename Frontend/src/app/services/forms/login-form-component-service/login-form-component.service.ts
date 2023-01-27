import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LoginDataRequest } from 'src/app/models/API/Request/login-data-request.interface';
import { LoginResponse } from 'src/app/models/API/Response/login-response.interface';
import { AuthStateService } from 'src/app/store/auth-state/auth-state.service';
import { HTTPService } from '../../httpservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginFormComponentService {
  constructor(private httpService: HTTPService, private authStateService: AuthStateService, private router: Router) {}

  sendLoginData(loginData: LoginDataRequest): Observable<number> {
    return this.httpService.POST<LoginResponse>('user', loginData).pipe(
      take(1),
      map(response => {
        if (response.statusCode === 200) {
          this.authStateService.onAuthDataReceived(
            response.responseBody.authToken,
            response.responseBody.userID,
            response.responseBody.userAvatarURL,
            response.responseBody.userName,
            response.responseBody.userServer,
            response.responseBody.accountType
          );
        }

        return response.statusCode;
      })
    );
  }
}
