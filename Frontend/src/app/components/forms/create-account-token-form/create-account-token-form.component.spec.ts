import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountTokenFormComponent } from './create-account-token-form.component';

describe('CreateAccountTokenFormComponent', () => {
  let component: CreateAccountTokenFormComponent;
  let fixture: ComponentFixture<CreateAccountTokenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountTokenFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccountTokenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
