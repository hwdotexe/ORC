import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthStateService } from 'src/app/store/auth-state/auth-state.service';
import { AuthService } from '../auth-service/auth.service';
import { PermissionsService } from '../permissions-service/permissions.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateCreateAccountTokenGuardService implements CanActivate {
  constructor(private permissionsService: PermissionsService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.permissionsService.canCreateAccountToken$().pipe(
      tap(canCreateToken => {
        if (!canCreateToken) {
          this.router.navigate(['']);
        }
      })
    );
  }
}
