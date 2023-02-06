import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { AuthStateService } from 'src/app/store/auth-state/auth-state.service';
import { BaseUnsubscribeComponent } from '../../base-unsubscribe.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor() {}
}
