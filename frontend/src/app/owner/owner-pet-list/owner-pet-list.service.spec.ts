import { TestBed, inject } from '@angular/core/testing';

import { OwnerPetListService } from './owner-pet-list.service';

describe('OwnerPetListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OwnerPetListService]
    });
  });

  it('should be created', inject([OwnerPetListService], (service: OwnerPetListService) => {
    expect(service).toBeTruthy();
  }));
});
