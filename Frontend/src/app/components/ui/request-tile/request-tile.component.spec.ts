import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTileComponent } from './request-tile.component';

describe('RequestItemComponent', () => {
  let component: RequestTileComponent;
  let fixture: ComponentFixture<RequestTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestTileComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
