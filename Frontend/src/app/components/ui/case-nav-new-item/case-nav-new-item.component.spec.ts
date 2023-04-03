import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseNavNewItemComponent } from './case-nav-new-item.component';

describe('CaseNavNewItemComponent', () => {
  let component: CaseNavNewItemComponent;
  let fixture: ComponentFixture<CaseNavNewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseNavNewItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseNavNewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
