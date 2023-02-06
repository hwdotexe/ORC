import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseNavComponent } from './case-nav.component';

describe('CaseNavComponent', () => {
  let component: CaseNavComponent;
  let fixture: ComponentFixture<CaseNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
