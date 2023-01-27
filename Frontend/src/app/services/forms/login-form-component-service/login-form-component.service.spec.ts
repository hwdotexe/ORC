import { TestBed } from '@angular/core/testing';

import { LoginFormComponentService } from './login-form-component.service';

describe('LoginFormComponentService', () => {
  let service: LoginFormComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginFormComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
