import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
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
