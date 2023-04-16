import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthStateService } from 'src/app/store/auth-state/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateAuthenticatedGuardService implements CanActivate {
  constructor(private authStateService: AuthStateService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authStateService.authToken$.pipe(
      take(1),
      map(token => {
        if (!token) {
          this.authStateService.onExpired();
          return false;
        }

        return true;
      })
    );
  }
}
