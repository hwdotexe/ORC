import { TestBed } from '@angular/core/testing';

import { TagMetadataService } from './tag-metadata.service';

describe('TagMetadataService', () => {
  let service: TagMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagMetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
