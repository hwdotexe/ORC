import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { AuthStateService } from 'src/app/store/auth-state/auth-state.service';
import { environment } from 'src/environments/environment.dev';
import { CaptchaService } from '../captcha/captcha.service';
import { PageLoadingService } from '../page-loading-service/page-loading.service';

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

  GET<T>(url: string, action: string, isProtected: boolean = true): Observable<HttpResponse<T>> {
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

  POST<T>(url: string, body: any, action: string, isProtected: boolean = true): Observable<HttpResponse<T>> {
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

  PUT<T>(url: string, body: any, action: string, isProtected: boolean = true): Observable<HttpResponse<T>> {
    this.pageLoadingService.loading();

    return this.authStateService.authToken$.pipe(
      take(1),
      withLatestFrom(isProtected ? this.captchaService.createCaptchaToken$('PUT_' + action) : of('token')),
      switchMap(([authToken, captchaToken]) => {
        let call = this.http.put<T>(environment.api_base + url, body, this.httpCallOptions(authToken, captchaToken));
        return this.mapResponse<T>(call);
      })
    );
  }

  PATCH<T>(url: string, body: any, action: string, isProtected: boolean = true): Observable<HttpResponse<T>> {
    this.pageLoadingService.loading();

    return this.authStateService.authToken$.pipe(
      take(1),
      withLatestFrom(isProtected ? this.captchaService.createCaptchaToken$('PATCH_' + action) : of('token')),
      switchMap(([authToken, captchaToken]) => {
        let call = this.http.request<T>('PATCH', environment.api_base + url, { ...this.httpCallOptions(authToken, captchaToken), body: body });
        return this.mapResponse<T>(call);
      })
    );
  }

  DELETE<T>(url: string, body: any, action: string, isProtected: boolean = true): Observable<HttpResponse<T>> {
    this.pageLoadingService.loading();

    return this.authStateService.authToken$.pipe(
      take(1),
      withLatestFrom(isProtected ? this.captchaService.createCaptchaToken$('DELETE_' + action) : of('token')),
      switchMap(([authToken, captchaToken]) => {
        let call = this.http.request<T>('DELETE', environment.api_base + url, { ...this.httpCallOptions(authToken, captchaToken), body: body });
        return this.mapResponse<T>(call);
      })
    );
  }

  private mapResponse<T>(call: Observable<HttpEvent<T>>): Observable<HttpResponse<T>> {
    return call.pipe(
      map((response: HttpResponse<T>) => response),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          this.router.navigate(['error']);
        }

        throw error;
      }),
      finalize(() => {
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
