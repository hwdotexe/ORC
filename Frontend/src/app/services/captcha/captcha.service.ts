import { Injectable } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  constructor(private recaptchaV3Service: ReCaptchaV3Service) {}

  createCaptchaToken$(action: string): Observable<string> {
    return this.recaptchaV3Service.execute(action);
  }
}
