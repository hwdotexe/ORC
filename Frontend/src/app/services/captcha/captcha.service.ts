import { Injectable } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  constructor(private recaptchaV3Service: ReCaptchaV3Service) {}

  createCaptchaToken$(action: string): Observable<string> {
    if (environment.production) {
      return this.recaptchaV3Service.execute(action);
    } else {
      return of('token');
    }
  }
}
