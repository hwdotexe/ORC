import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountInfo } from 'src/app/models/account-info.interface';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { AuthStateService } from 'src/app/store/auth-state/auth-state.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  accountInfo$: Observable<AccountInfo>;

  constructor(private authService: AuthService, private authStateService: AuthStateService) {}

  ngOnInit(): void {
    this.accountInfo$ = this.authService.getAccountInfo$();
  }

  logOut(): void {
    this.authStateService.onLogOut();
  }
}
