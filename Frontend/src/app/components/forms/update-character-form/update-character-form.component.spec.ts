import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCharacterFormComponent } from './update-character-form.component';

describe('UpdateCharacterFormComponent', () => {
  let component: UpdateCharacterFormComponent;
  let fixture: ComponentFixture<UpdateCharacterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCharacterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCharacterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
