import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { AuthStateService } from 'src/app/store/auth-state/auth-state.service';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { APIResponse } from 'src/app/models/API/Response/generic-api-response.interface';
import { PageLoadingService } from '../page-loading-service/page-loading.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.dev';
import { CaptchaService } from '../captcha/captcha.service';

@Injectable({
  providedIn: 'root'
})
export class HTTPService {
  APP_URL_BASE: string;

  constructor(
    private http: HttpClient,
    private pageLoadingService: PageLoadingService,
    private authStateService: AuthStateService,
    private router: Router,
    private captchaService: CaptchaService
  ) {}

  GET<T>(url: string, action: string, isProtected: boolean = true): Observable<APIResponse<T>> {
    this.pageLoadingService.loading();

    return this.authStateService.authToken$.pipe(
      take(1),
      withLatestFrom(isProtected ? this.captchaService.createCaptchaToken$('GET_' + action) : of('token')),
      switchMap(([authToken, captchaToken]) => {
        let call = this.http.get<T>(environment.api_base + url, this.httpCallOptions(authToken, captchaToken));
        return this.mapResponse<T>(call);
      })
    );
  }

  POST<T>(url: string, body: any, action: string, isProtected: boolean = true): Observable<APIResponse<T>> {
    this.pageLoadingService.loading();

    return this.authStateService.authToken$.pipe(
      take(1),
      withLatestFrom(isProtected ? this.captchaService.createCaptchaToken$('POST_' + action) : of('token')),
      switchMap(([authToken, captchaToken]) => {
        let call = this.http.post<T>(environment.api_base + url, body, this.httpCallOptions(authToken, captchaToken));
        return this.mapResponse<T>(call);
      })
    );
  }

  PUT<T>(url: string, body: any, action: string): Observable<APIResponse<T>> {
    this.pageLoadingService.loading();

    return this.authStateService.authToken$.pipe(
      take(1),
      withLatestFrom(this.captchaService.createCaptchaToken$('PUT_' + action)),
      switchMap(([authToken, captchaToken]) => {
        let call = this.http.put<T>(environment.api_base + url, body, this.httpCallOptions(authToken, captchaToken));
        return this.mapResponse<T>(call);
      })
    );
  }

  PATCH<T>(url: string, body: any, action: string): Observable<APIResponse<T>> {
    this.pageLoadingService.loading();

    return this.authStateService.authToken$.pipe(
      take(1),
      withLatestFrom(this.captchaService.createCaptchaToken$('PATCH_' + action)),
      switchMap(([authToken, captchaToken]) => {
        let call = this.http.request<T>('PATCH', environment.api_base + url, { ...this.httpCallOptions(authToken, captchaToken), body: body });
        return this.mapResponse<T>(call);
      })
    );
  }

  DELETE<T>(url: string, body: any, action: string): Observable<APIResponse<T>> {
    this.pageLoadingService.loading();

    return this.authStateService.authToken$.pipe(
      take(1),
      withLatestFrom(this.captchaService.createCaptchaToken$('DELETE_' + action)),
      switchMap(([authToken, captchaToken]) => {
        let call = this.http.request<T>('DELETE', environment.api_base + url, { ...this.httpCallOptions(authToken, captchaToken), body: body });
        return this.mapResponse<T>(call);
      })
    );
  }

  handleNonSuccessResponseNavigation(responseCode: number): void {
    switch (responseCode) {
      case 401:
        this.router.navigate(['/login']);
        break;
      case 500:
        this.router.navigate(['/error']);
        break;
    }
  }

  private mapResponse<T>(call: Observable<HttpEvent<T>>): Observable<APIResponse<T>> {
    return call.pipe(
      take(1),
      switchMap((response: HttpResponse<T>) => {
        return of({
          statusCode: response.status,
          responseBody: response.body
        });
      }),
      catchError((error: HttpErrorResponse) => {
        return of({
          statusCode: error.status,
          responseBody: error.error
        });
      }),
      tap(() => {
        this.pageLoadingService.clear();
      })
    );
  }

  private httpCallOptions(authToken: string, captchaToken: string): any {
    return {
      headers: { Authorization: 'Bearer ' + authToken, 'X-Captcha-Token': captchaToken },
      observe: 'response'
    };
  }
}
