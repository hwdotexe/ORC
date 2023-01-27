import { TestBed } from '@angular/core/testing';

import { RequestReviewFormComponentService } from './request-review-form-component.service';

describe('RequestReviewFormComponentService', () => {
  let service: RequestReviewFormComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestReviewFormComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
