import { TestBed, inject } from '@angular/core/testing';

import { BrowsePetsService } from './browse-pets.service';

describe('BrowsePetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowsePetsService]
    });
  });

  it('should be created', inject([BrowsePetsService], (service: BrowsePetsService) => {
    expect(service).toBeTruthy();
  }));
});
