import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { RegisterDataRequest } from 'src/app/models/API/Request/register-data-request.interface';
import { LoginResponse } from 'src/app/models/API/Response/login-response.interface';
import { AuthStateService } from 'src/app/store/auth-state/auth-state.service';
import { HTTPService } from '../../httpservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormComponentService {
  constructor(private httpService: HTTPService, private authStateService: AuthStateService, private router: Router) {}

  sendRegisterData(registerData: RegisterDataRequest): Observable<number> {
    return this.httpService.PUT<LoginResponse>('user', registerData).pipe(
      take(1),
      map(response => {
        if (response.statusCode === 201) {
          this.authStateService.onAuthDataReceived(
            response.responseBody.authToken,
            response.responseBody.userID,
            response.responseBody.userAvatarURL,
            registerData.characterName,
            registerData.characterServer,
            response.responseBody.accountType
          );
        }

        return response.statusCode;
      })
    );
  }
}
