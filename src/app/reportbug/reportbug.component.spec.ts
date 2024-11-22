import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportbugComponent } from './reportbug.component';

describe('ReportbugComponent', () => {
  let component: ReportbugComponent;
  let fixture: ComponentFixture<ReportbugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportbugComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportbugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
