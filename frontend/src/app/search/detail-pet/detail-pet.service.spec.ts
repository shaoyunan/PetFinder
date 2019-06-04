import { TestBed, inject } from '@angular/core/testing';

import { DetailPetService } from './detail-pet.service';

describe('DetailPetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailPetService]
    });
  });

  it('should be created', inject([DetailPetService], (service: DetailPetService) => {
    expect(service).toBeTruthy();
  }));
});
