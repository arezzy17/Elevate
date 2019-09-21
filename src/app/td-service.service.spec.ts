import { TestBed } from '@angular/core/testing';

import { TdServiceService } from './td-service.service';

describe('TdServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TdServiceService = TestBed.get(TdServiceService);
    expect(service).toBeTruthy();
  });
});
