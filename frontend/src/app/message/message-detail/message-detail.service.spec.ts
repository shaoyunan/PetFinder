import { TestBed, inject } from '@angular/core/testing';

import { MessageDetailService } from './message-detail.service';

describe('MessageDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageDetailService]
    });
  });

  it('should be created', inject([MessageDetailService], (service: MessageDetailService) => {
    expect(service).toBeTruthy();
  }));
});
