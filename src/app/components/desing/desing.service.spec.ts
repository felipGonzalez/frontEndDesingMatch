import { TestBed } from '@angular/core/testing';

import { DesingService } from './desing.service';

describe('DesingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DesingService = TestBed.get(DesingService);
    expect(service).toBeTruthy();
  });
});
