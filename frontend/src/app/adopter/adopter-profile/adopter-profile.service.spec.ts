import { TestBed, inject } from '@angular/core/testing';

import { AdopterProfileService } from './adopter-profile.service';

describe('AdopterProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdopterProfileService]
    });
  });

  it('should be created', inject([AdopterProfileService], (service: AdopterProfileService) => {
    expect(service).toBeTruthy();
  }));
});
