import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpvefrifyComponent } from './otpvefrify.component';

describe('OtpvefrifyComponent', () => {
  let component: OtpvefrifyComponent;
  let fixture: ComponentFixture<OtpvefrifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpvefrifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpvefrifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
