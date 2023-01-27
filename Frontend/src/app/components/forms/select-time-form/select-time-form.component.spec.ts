import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTimeFormComponent } from './select-time-form.component';

describe('SelectTimeFormComponent', () => {
  let component: SelectTimeFormComponent;
  let fixture: ComponentFixture<SelectTimeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTimeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectTimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
