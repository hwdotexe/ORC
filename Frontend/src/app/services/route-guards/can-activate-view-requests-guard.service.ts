import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PermissionsService } from '../permissions-service/permissions.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateViewRequestsGuardService implements CanActivate {
  constructor(private permissionsService: PermissionsService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.permissionsService.canViewRequests$().pipe(
      tap(canViewRequests => {
        if (!canViewRequests) {
          this.router.navigate(['']);
        }
      })
    );
  }
}
