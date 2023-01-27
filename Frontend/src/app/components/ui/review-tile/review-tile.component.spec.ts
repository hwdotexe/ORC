import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTileComponent } from './review-tile.component';

describe('ReviewTileComponent', () => {
  let component: ReviewTileComponent;
  let fixture: ComponentFixture<ReviewTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewTileComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
