import { TestBed } from '@angular/core/testing';

import { RegisterFormComponentService } from './register-form-component.service';

describe('RegisterFormComponentService', () => {
  let service: RegisterFormComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterFormComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
