import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsePetsComponent } from './browse-pets.component';

describe('BrowsePetsComponent', () => {
  let component: BrowsePetsComponent;
  let fixture: ComponentFixture<BrowsePetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowsePetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsePetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
