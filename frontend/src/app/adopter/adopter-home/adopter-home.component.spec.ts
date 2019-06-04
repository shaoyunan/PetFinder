import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdopterHomeComponent } from './adopter-home.component';

describe('AdopterHomeComponent', () => {
  let component: AdopterHomeComponent;
  let fixture: ComponentFixture<AdopterHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdopterHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdopterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
