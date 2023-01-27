import { TestBed } from '@angular/core/testing';

import { ReviewFormComponentService } from './review-form-component.service';

describe('ComposeComponentService', () => {
  let service: ReviewFormComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewFormComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
