import { TestBed, inject } from '@angular/core/testing';

import { ContactCardService } from './contact-card.service';

describe('ContactCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactCardService]
    });
  });

  it('should be created', inject([ContactCardService], (service: ContactCardService) => {
    expect(service).toBeTruthy();
  }));
});
