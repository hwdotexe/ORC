import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerNameComponent } from './reviewer-name.component';

describe('ReviewerNameComponent', () => {
  let component: ReviewerNameComponent;
  let fixture: ComponentFixture<ReviewerNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewerNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
