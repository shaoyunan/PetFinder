import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Article5Component } from './article5.component';

describe('Article5Component', () => {
  let component: Article5Component;
  let fixture: ComponentFixture<Article5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Article5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Article5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
