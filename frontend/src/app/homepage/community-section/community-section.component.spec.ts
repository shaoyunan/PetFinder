import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitySectionComponent } from './community-section.component';

describe('CommunitySectionComponent', () => {
  let component: CommunitySectionComponent;
  let fixture: ComponentFixture<CommunitySectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitySectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
