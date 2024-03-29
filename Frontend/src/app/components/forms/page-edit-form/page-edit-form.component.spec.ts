import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEditFormComponent } from './page-edit-form.component';

describe('PageEditFormComponent', () => {
  let component: PageEditFormComponent;
  let fixture: ComponentFixture<PageEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
