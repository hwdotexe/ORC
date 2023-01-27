import { TestBed } from '@angular/core/testing';

import { UpdateCharacterFormComponentService } from './update-character-form-component.service';

describe('UpdateCharacterFormComponentService', () => {
  let service: UpdateCharacterFormComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateCharacterFormComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
