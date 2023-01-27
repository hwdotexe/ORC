import { Component, OnInit } from '@angular/core';
import { CreateAccountTokenResponse } from 'src/app/models/API/Response/create-account-token-response.interface';

@Component({
  selector: 'app-create-account-token',
  templateUrl: './create-account-token.component.html',
  styleUrls: ['./create-account-token.component.css']
})
export class CreateAccountTokenComponent implements OnInit {
  tokenResponse: CreateAccountTokenResponse;

  constructor() {}

  ngOnInit(): void {}

  updateToken(token: CreateAccountTokenResponse): void {
    this.tokenResponse = token;
  }
}
