import { TestBed, inject } from '@angular/core/testing';

import { PetSectionService } from './pet-section.service';

describe('PetSectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PetSectionService]
    });
  });

  it('should be created', inject([PetSectionService], (service: PetSectionService) => {
    expect(service).toBeTruthy();
  }));
});
