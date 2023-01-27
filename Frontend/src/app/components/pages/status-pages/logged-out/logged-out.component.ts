import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/store/auth-state/auth-state.service';

@Component({
  selector: 'app-logged-out',
  templateUrl: './logged-out.component.html',
  styleUrls: ['./logged-out.component.css'],
})
export class LoggedOutComponent implements OnInit {
  constructor(private authStateService: AuthStateService) {}

  ngOnInit(): void {
    this.authStateService.onAuthDataCleared();
  }
}
