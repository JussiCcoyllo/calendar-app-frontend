import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterWithPasswordComponent } from './register-with-password.component';

describe('RegisterWithPasswordComponent', () => {
  let component: RegisterWithPasswordComponent;
  let fixture: ComponentFixture<RegisterWithPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterWithPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterWithPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
