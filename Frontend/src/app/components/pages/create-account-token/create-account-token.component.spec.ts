import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountTokenComponent } from './create-account-token.component';

describe('CreateAccountTokenComponent', () => {
  let component: CreateAccountTokenComponent;
  let fixture: ComponentFixture<CreateAccountTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
