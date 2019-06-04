import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdopterProfileComponent } from './adopter-profile.component';

describe('AdopterProfileComponent', () => {
  let component: AdopterProfileComponent;
  let fixture: ComponentFixture<AdopterProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdopterProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdopterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
