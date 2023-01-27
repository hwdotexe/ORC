import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestReviewFormComponent } from './request-review-form.component';

describe('RequestReviewFormComponent', () => {
  let component: RequestReviewFormComponent;
  let fixture: ComponentFixture<RequestReviewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestReviewFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
