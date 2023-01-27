import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { BaseUnsubscribeComponent } from '../../base-unsubscribe.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends BaseUnsubscribeComponent implements OnInit {
  userID$: Observable<string>;

  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.userID$ = this.authService.getUserID$();
  }

  clickLogOut(): void {
    this.authService
      .logOut$()
      .pipe(take(1), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.router.navigate(['/logged-out']);
      });
  }
}
