import { TestBed } from '@angular/core/testing';

import { CreateAccountTokenFormComponentService } from './create-account-token-form-component.service';

describe('CreateAccountTokenFormService', () => {
  let service: CreateAccountTokenFormComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAccountTokenFormComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
