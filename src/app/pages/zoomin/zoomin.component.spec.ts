import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoominComponent } from './zoomin.component';

describe('ZoominComponent', () => {
  let component: ZoominComponent;
  let fixture: ComponentFixture<ZoominComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoominComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoominComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
