import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFolderViewComponent } from './page-folder-view.component';

describe('PageFolderViewComponent', () => {
  let component: PageFolderViewComponent;
  let fixture: ComponentFixture<PageFolderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageFolderViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFolderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
