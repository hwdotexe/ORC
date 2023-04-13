import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay, withLatestFrom } from 'rxjs/operators';
import { AccountInfo } from 'src/app/models/account-info.interface';
import { AccountType } from 'src/app/models/enum/account-type.enum';
import { AuthStateService } from 'src/app/store/auth-state/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private authStateService: AuthStateService) {}

  getAccountInfo$(): Observable<AccountInfo> {
    return this.authStateService.userID$.pipe(
      withLatestFrom(this.authStateService.displayName$, this.authStateService.accountType$, this.authStateService.avatarURL$),
      map(([userID, displayName, accountType, avatarURL]) => {
        return userID ? { userID, displayName, accountType, avatarURL } : undefined;
      })
    );
  }

  getUserID$(): Observable<string> {
    return this.authStateService.userID$.pipe(shareReplay({ refCount: true, bufferSize: 1 }));
  }

  getDisplayName$(): Observable<string> {
    return this.authStateService.displayName$.pipe(shareReplay({ refCount: true, bufferSize: 1 }));
  }

  checkUserSessionActive$(): Observable<boolean> {
    return of(true);
    // return this.authStateService.authToken$.pipe(
    //   switchMap(token => {
    //     if (token) {
    //       return this.httpService.GET<any>('heartbeat', 'HEARTBEAT', false).pipe(
    //         take(1),
    //         map(response => response.statusCode === 200)
    //       );
    //     } else {
    //       return of(false);
    //     }
    //   })
    // );
  }

  getUserAccountType$(): Observable<AccountType> {
    return this.authStateService.accountType$.pipe(shareReplay({ refCount: true, bufferSize: 1 }));
  }
}
