import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerPetListComponent } from './owner-pet-list.component';

describe('OwnerPetListComponent', () => {
  let component: OwnerPetListComponent;
  let fixture: ComponentFixture<OwnerPetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerPetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerPetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
