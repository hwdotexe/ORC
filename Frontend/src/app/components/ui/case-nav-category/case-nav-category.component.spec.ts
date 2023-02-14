import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseNavCategoryComponent } from './case-nav-category.component';

describe('CaseNavCategoryComponent', () => {
  let component: CaseNavCategoryComponent;
  let fixture: ComponentFixture<CaseNavCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseNavCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseNavCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
