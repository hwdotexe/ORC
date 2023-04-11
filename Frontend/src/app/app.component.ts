import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AppDetailsStateService } from './store/app-details-state/app-details-state.service';
import { AuthStateService } from './store/auth-state/auth-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private appDetailsStateService: AppDetailsStateService, private authStateService: AuthStateService) {}

  ngOnInit(): void {
    this.authStateService.authToken$.pipe(take(1)).subscribe(token => {
      if (token) {
        this.appDetailsStateService.onHeartbeat();
      }
    });
  }
}
