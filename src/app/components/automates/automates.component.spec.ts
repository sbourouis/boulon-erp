import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomatesComponent } from './automates.component';

describe('AutomatesComponent', () => {
  let component: AutomatesComponent;
  let fixture: ComponentFixture<AutomatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
