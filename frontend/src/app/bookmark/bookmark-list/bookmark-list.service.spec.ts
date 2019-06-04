import { TestBed, inject } from '@angular/core/testing';

import { BookmarkListService } from './bookmark-list.service';

describe('BookmarkListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookmarkListService]
    });
  });

  it('should be created', inject([BookmarkListService], (service: BookmarkListService) => {
    expect(service).toBeTruthy();
  }));
});
