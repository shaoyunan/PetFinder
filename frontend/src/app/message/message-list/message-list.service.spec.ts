import { TestBed, inject } from '@angular/core/testing';

import { MessageListService } from './message-list.service';

describe('MessageListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageListService]
    });
  });

  it('should be created', inject([MessageListService], (service: MessageListService) => {
    expect(service).toBeTruthy();
  }));
});
