import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateAuthenticatedGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.checkUserSessionActive$().pipe(
      withLatestFrom(this.authService.getUserID$()),
      tap(([isSessionActive, userID]) => {
        if (!isSessionActive) {
          if (userID) {
            this.router.navigate(['/logged-out']);
          } else {
            this.router.navigate(['']);
          }
        }
      }),
      map(([isSessionActive]) => isSessionActive)
    );
  }
}
