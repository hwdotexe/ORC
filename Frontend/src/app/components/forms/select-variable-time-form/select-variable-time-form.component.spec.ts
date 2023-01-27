import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVariableTimeComponent } from './select-variable-time-form.component';

describe('SelectVariableTimeComponent', () => {
  let component: SelectVariableTimeComponent;
  let fixture: ComponentFixture<SelectVariableTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectVariableTimeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectVariableTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
