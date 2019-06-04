import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdopterNavComponent } from './adopter-nav.component';

describe('AdopterNavComponent', () => {
  let component: AdopterNavComponent;
  let fixture: ComponentFixture<AdopterNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdopterNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdopterNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
