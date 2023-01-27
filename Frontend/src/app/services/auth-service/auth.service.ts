import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { AccountType } from 'src/app/models/enum/account-type.enum';
import { AuthStateService } from 'src/app/store/auth-state/auth-state.service';
import { HTTPService } from '../httpservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private authStateService: AuthStateService, private httpService: HTTPService) {}

  getUserID$(): Observable<string> {
    return this.authStateService.userID$.pipe(shareReplay({ refCount: true, bufferSize: 1 }));
  }

  getUserName$(): Observable<string> {
    return this.authStateService.userName$.pipe(shareReplay({ refCount: true, bufferSize: 1 }));
  }

  getUserAvatarURL$(): Observable<string> {
    return this.authStateService.userAvatarURL$.pipe(shareReplay({ refCount: true, bufferSize: 1 }));
  }

  checkUserSessionActive$(): Observable<boolean> {
    return this.authStateService.authToken$.pipe(
      switchMap(token => {
        if (token) {
          return this.httpService.GET<any>('sessioncheck', 'CHECK_SESSION').pipe(
            take(1),
            map(response => {
              if (response.statusCode == 200) {
                return true;
              } else {
                return false;
              }
            })
          );
        } else {
          return of(false);
        }
      })
    );
  }

  getUserAccountType$(): Observable<AccountType> {
    return this.authStateService.accountType$.pipe(shareReplay({ refCount: true, bufferSize: 1 }));
  }

  logOut$(): Observable<boolean> {
    return this.httpService.POST<any>('logout', {}, 'LOGOUT').pipe(
      take(1),
      map(() => true)
    );
  }
}
