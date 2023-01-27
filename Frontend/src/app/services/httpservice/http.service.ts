import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { AuthStateService } from 'src/app/store/auth-state/auth-state.service';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { APIResponse } from 'src/app/models/API/Response/generic-api-response.interface';
import { PageLoadingService } from '../page-loading-service/page-loading.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class HTTPService {
  APP_URL_BASE: string;

  constructor(
    private http: HttpClient,
    private pageLoadingService: PageLoadingService,
    private authStateService: AuthStateService,
    private router: Router
  ) {}

  GET<T>(url: string): Observable<APIResponse<T>> {
    this.pageLoadingService.loading();

    return this.authStateService.authToken$.pipe(
      take(1),
      switchMap((token) => {
        let call = this.http.get<T>(environment.api_base + url, this.httpCallOptions(token));
        return this.mapResponse<T>(call);
      })
    );
  }

  POST<T>(url: string, body: any): Observable<APIResponse<T>> {
    this.pageLoadingService.loading();

    return this.authStateService.authToken$.pipe(
      take(1),
      switchMap((token) => {
        let call = this.http.post<T>(environment.api_base + url, body, this.httpCallOptions(token));
        return this.mapResponse<T>(call);
      })
    );
  }

  PUT<T>(url: string, body: any): Observable<APIResponse<T>> {
    this.pageLoadingService.loading();

    return this.authStateService.authToken$.pipe(
      take(1),
      switchMap((token) => {
        let call = this.http.put<T>(environment.api_base + url, body, this.httpCallOptions(token));
        return this.mapResponse<T>(call);
      })
    );
  }

  PATCH<T>(url: string, body: any): Observable<APIResponse<T>> {
    this.pageLoadingService.loading();

    return this.authStateService.authToken$.pipe(
      take(1),
      switchMap((token) => {
        let call = this.http.request<T>('PATCH', environment.api_base + url, { ...this.httpCallOptions(token), body: body });
        return this.mapResponse<T>(call);
      })
    );
  }

  DELETE<T>(url: string, body: any): Observable<APIResponse<T>> {
    this.pageLoadingService.loading();

    return this.authStateService.authToken$.pipe(
      take(1),
      switchMap((token) => {
        let call = this.http.request<T>('DELETE', environment.api_base + url, { ...this.httpCallOptions(token), body: body });
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
          responseBody: response.body,
        });
      }),
      catchError((error: HttpErrorResponse) => {
        return of({
          statusCode: error.status,
          responseBody: error.error,
        });
      }),
      tap(() => {
        this.pageLoadingService.clear();
      })
    );
  }

  private httpCallOptions(authToken: string): any {
    return {
      headers: { Authorization: 'Bearer ' + authToken },
      observe: 'response',
    };
  }
}
