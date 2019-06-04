import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkSaveComponent } from './bookmark-save.component';

describe('BookmarkSaveComponent', () => {
  let component: BookmarkSaveComponent;
  let fixture: ComponentFixture<BookmarkSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarkSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
