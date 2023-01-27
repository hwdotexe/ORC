import { TestBed } from '@angular/core/testing';

import { ReportFormComponentService } from './report-form-component.service';

describe('ReportFormComponentService', () => {
  let service: ReportFormComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportFormComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
