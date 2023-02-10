import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFolderButtonComponent } from './page-folder-button.component';

describe('PageFolderButtonComponent', () => {
  let component: PageFolderButtonComponent;
  let fixture: ComponentFixture<PageFolderButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageFolderButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFolderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
