import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Usage1Component } from './usage1.component';

describe('Usage1Component', () => {
  let component: Usage1Component;
  let fixture: ComponentFixture<Usage1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Usage1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Usage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
