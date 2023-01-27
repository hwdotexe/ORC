import { TestBed } from '@angular/core/testing';

import { UserManagementComponentService } from './user-management-component.service';

describe('UserManagementComponentService', () => {
  let service: UserManagementComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManagementComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
