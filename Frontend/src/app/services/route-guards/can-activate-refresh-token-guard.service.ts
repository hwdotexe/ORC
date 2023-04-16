import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AppDetailsStateService } from 'src/app/store/app-details-state/app-details-state.service';
import { AuthStateService } from 'src/app/store/auth-state/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateRefreshTokenGuardService implements CanActivate {
  constructor(private authStateService: AuthStateService, private appDetailsStateService: AppDetailsStateService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authStateService.authToken$.pipe(
      take(1),
      map(token => {
        if (token) {
          this.appDetailsStateService.onHeartbeat();
          return true;
        }

        return false;
      })
    );
  }
}
