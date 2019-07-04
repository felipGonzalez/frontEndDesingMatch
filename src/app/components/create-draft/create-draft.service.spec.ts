import { TestBed } from '@angular/core/testing';

import { CreateDraftService } from './create-draft.service';

describe('CreateDraftService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateDraftService = TestBed.get(CreateDraftService);
    expect(service).toBeTruthy();
  });
});
